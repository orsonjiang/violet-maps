import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modals/Modal";
import MapProps from "../../components/Modals/MapProps";
import Toolbar from "./components/Toolbar";

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// NEW CODE - plugins
import "../../../../choropleth.js"; // choropleth plugin
import "../../../../leaflet-heat.js"; // (HEAT) heatmap plugin
import centroid from "@turf/centroid"; // calculate center point

import geobuf from "geobuf";
import Pbf from "pbf";
// import { updateMapData } from "../../../actions/map";

import { setView } from "../../../actions/home";
import { openModal } from '../../../actions/modal';
import { updateSelectedFeature } from "../../../actions/map";


const EditMap = () => {
    const map = useRef(null);
    const navigate = useNavigate();

    const [layerControl, setLayerControl] = useState(null); // NEW CODE - keeping track of the layer control so that I can delete it later
    const [geojson, setGeojson] = useState(null);

    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);
    // const exportType = useSelector((state) => state.map.exportType);
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    const openCurrentModal = (type) => {
        dispatch(openModal(type));
    }

    // NEW CODE
    const increaseStroke = (e) => {
        var layer = e.target;

        // increase stroke weight to show that feature can be selected
        layer.setStyle({
            weight: 5,
        })
    }

    // NEW CODE
    const resetStroke = (e) => {
        var layer = e.target;

        // return to original stroke weight
        layer.setStyle({
            weight: 3,
        })
    }

    // NEW CODE
    const clickFeature = (e) => {
        // zoom into feature
        map.current.fitBounds(e.target.getBounds());
        
        // set the selected feature in store
        dispatch(updateSelectedFeature({
            featureRef: e.target, // this has the index and the color
        }));
    }

    // NEW CODE
    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: increaseStroke,
            mouseout: resetStroke,
            click: clickFeature
        })
        if (currentMap.graphics.showLabels) {
            layer.bindTooltip(`<div style='font-size: ${currentMap.graphics.fontSize}px'>` + feature.properties[currentMap.graphics.dataProperty] + "</div>", 
                {
                    permanent: true,
                    direction: currentMap.graphics.labelPosition,
                    className: `bg-white border-transparent shadow-none ${currentMap.graphics.fontStyle}` // NEW CODE - tooltip styling
                })
        }
    }

    useEffect(() => {
        dispatch(setView("NONE"));
        if (currentMap == null) {
            navigate("/app/home"); // for now
        }
        if (!map.current) {

            map.current = L.map('map').setView([39.74739, -105], 2); // NEW CODE - removed preferCanvas

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map.current);

            var southWest = L.latLng(-90, -180);
            var northEast = L.latLng(90, 180);
            var bounds = L.latLngBounds(southWest, northEast);

            map.current.setMaxBounds(bounds);
            map.current.on('drag', function() {
                map.current.panInsideBounds(bounds, { animate: false });
            });

            // NEW CODE - panes to help preserve layer order when you use the layer control
            map.current.createPane('0');
            map.current.createPane('1');
            map.current.createPane('2');
            map.current.createPane('3');
            map.current.getPane('0').style.zIndex = 200;
            map.current.getPane('1').style.zIndex = 250;
            map.current.getPane('2').style.zIndex = 300;
            map.current.getPane('3').style.zIndex = 350;
            
            // get the map data from the store and convert back to geojson
            const convertToGeoJSON = async () => {
                //convert from base64 back to string
                let str = atob(currentMap.data);
                let buf = new ArrayBuffer(str.length);
                let bufView = new Uint8Array(buf);
                for (var i=0; i<str.length; i++) {
                    bufView[i] = str.charCodeAt(i);
                }

                var json = geobuf.decode(new Pbf(bufView));
                // NEW CODE - replace original geojson features with our custom one
                for (let i = 0; i < json.features.length; i++) {
                    json.features[i].properties = currentMap.features[i].properties;
                }
                setGeojson(json);
                return json;
            }
            convertToGeoJSON().then((geo) => {
                var overlays = {}; // NEW CODE - keeps track of the overlay layers

                if (currentMap.graphics.choropleth) { // NEW CODE: if there is a choropleth map, display this layer
                    const choropleth = L.choropleth(geo, {
                        valueProperty: currentMap.graphics.choropleth.dataProperty,
                        scale: ['white', currentMap.graphics.choropleth.color],
                        steps: 6,
                        mode: 'q',
                        style: {
                            fillOpacity: 0.9
                        },
                        pane: '0'
                      }).addTo(map.current)
                    overlays["Hide/Show Choropleth"] = choropleth;
                }

                const edits = L.geoJSON(geo, {
                    style: function (feature) {
                        return {
                            color: currentMap.features[geo.features.indexOf(feature)].style.border,
                            fillColor: currentMap.features[geo.features.indexOf(feature)].style.fill,
                            fillOpacity: 0.9 // NEW CODE
                        }
                    },
                    onEachFeature: onEachFeature,
                    pane: '1'
                }).addTo(map.current);
                overlays["Hide/Show Your Edits"] = edits;

                if (currentMap.graphics.heatMap) { // NEW CODE: (HEAT) if there is a heat map, display this layer
                    const points = []
                    for (let i = 0; i < geo.features.length; i++) {
                        const point = centroid(geo.features[i]); // get the center coordinates of polygon
                        points.push([point.geometry.coordinates[1], point.geometry.coordinates[0], geo.features[i].properties[currentMap.graphics.dataProperty]]); // heat map will update based on selected data property
                    }
                    const heat = L.heatLayer(points, {pane: '2', radius: 27, minOpacity: 0.55, gradient: {0.4: 'blue', 0.6: 'lime', 1: 'red'}}).addTo(map.current);
                    overlays["Hide/Show Heat Map"] = heat // add heat layer to overlays object
                }
                if (currentMap.graphics.bubbles) { // NEW CODE: (BUBBLE) if there is a bubble map, display this layer
                    let max = geo.features[0].properties[currentMap.graphics.dataProperty]; // finding the max value for the selected data property
                    let val = max; // temp value
                    for (let i = 0; i < geo.features.length; i++) { // finding max
                        val = geo.features[i].properties[currentMap.graphics.dataProperty];
                        if (val > max) {
                            max = val;
                        }
                    }
                    
                    const circles = []
                    for (let i = 0; i < geo.features.length; i++) {
                        const point = centroid(geo.features[i]); // get the center coordinates of polygon
                        circles.push(L.circleMarker([point.geometry.coordinates[1], point.geometry.coordinates[0]], {
                            radius: (geo.features[i].properties[currentMap.graphics.dataProperty] * 20) / max,
                            color: currentMap.graphics.bubbles.color,
                            fillOpacity: 0.3
                        }));
                    }
                    var bubble = L.layerGroup(circles, {pane: '3'}).addTo(map.current); // put all the circles in one layer so i can easily hide/show all of them at once
                    overlays["Hide/Show Bubbles"] = bubble // add bubble layer to overlays object
                }

                const c = L.control.layers({}, overlays, {collapsed: false}).addTo(map.current); // NEW CODE - layer control so that users can edit underneath the heat and bubble map             
                setLayerControl(c); // NEW CODE: ref to layer control so that I can delete it later
            })

        }
    }, [])

    useEffect(() => {
        if (geojson != null) {
            map.current.eachLayer(function (layer) {
                if (!layer.getAttribution()) {
                    map.current.removeLayer(layer);
                }
            });
            layerControl.remove(map.current); // NEW CODE - removing old layer control

            var overlays = {}; // NEW CODE - keeps track of the overlay layers
            if (currentMap.graphics.choropleth) { // NEW CODE: if there is a choropleth map, display this layer
                const choropleth = L.choropleth(geojson, {
                    valueProperty: currentMap.graphics.choropleth.dataProperty,
                    scale: ['white', currentMap.graphics.choropleth.color],
                    steps: 6,
                    mode: 'q',
                    style: {
                        fillOpacity: 0.9
                    },
                    pane: '0'
                  }).addTo(map.current)
                overlays["Hide/Show Choropleth"] = choropleth;
            }

            const edits = L.geoJSON(geojson, {
                style: function (feature) {
                    return {
                        color: currentMap.features[geojson.features.indexOf(feature)].style.border,
                        fillColor: currentMap.features[geojson.features.indexOf(feature)].style.fill,
                        fillOpacity: 0.9 // NEW CODE
                    }
                },
                onEachFeature: onEachFeature,
                pane: '1'
            }).addTo(map.current);
            overlays["Hide/Show Your Edits"] = edits;

            if (currentMap.graphics.heatMap) { // NEW CODE: (HEAT) if there is a heat map, display this layer
                const points = []
                for (let i = 0; i < geojson.features.length; i++) {
                    const point = centroid(geojson.features[i]); // get the center coordinates of polygon
                    points.push([point.geometry.coordinates[1], point.geometry.coordinates[0], geojson.features[i].properties[currentMap.graphics.dataProperty]]); // heat map will update based on selected data property
                }
                const heat = L.heatLayer(points, {pane: '2', radius: 27, minOpacity: 0.55, gradient: {0.4: 'blue', 0.6: 'lime', 1: 'red'}}).addTo(map.current);
                overlays["Hide/Show Heat Map"] = heat // add heat layer to overlays object
            }

            if (currentMap.graphics.bubbles) { // NEW CODE: (BUBBLE) if there is a bubble map, display this layer
                let max = geojson.features[0].properties[currentMap.graphics.dataProperty]; // finding the max value for the selected data property
                let val = max; // temp value
                for (let i = 0; i < geojson.features.length; i++) { // finding max
                    val = geojson.features[i].properties[currentMap.graphics.dataProperty];
                    if (val > max) {
                        max = val;
                    }
                }
                
                const circles = []
                for (let i = 0; i < geojson.features.length; i++) {
                    const point = centroid(geojson.features[i]); // get the center coordinates of polygon
                    circles.push(L.circleMarker([point.geometry.coordinates[1], point.geometry.coordinates[0]], {
                        radius: (geojson.features[i].properties[currentMap.graphics.dataProperty] * 20) / max,
                        color: currentMap.graphics.bubbles.color,
                        fillOpacity: 0.5
                    }));
                }
                var bubble = L.layerGroup(circles, {pane: '3'}).addTo(map.current); // put all the circles in one layer so i can easily hide/show all of them at once
                overlays["Hide/Show Bubbles"] = bubble // add bubble layer to overlays object
            }
        
            const c = L.control.layers({}, overlays, {collapsed: false}).addTo(map.current); // NEW CODE - layer control so that users can edit underneath the heat and bubble map   
            setLayerControl(c);                 
        }
    }, [currentMap])


    const selectModal = () => {
        if (currentModal == "MAP_PROPS_MODAL"){
            return ( <MapProps /> );
        }
        else if (currentModal == "RENAME_MAP"){
            return (<Modal title={"Rename Map?"} description={"Write a new name for the Map of Europe"} inputText={"Enter Map Name"} containsInput={true} />);

        }
    }


    return (
        <div className="text-[13px]">
            <div className="flex gap-4 mt-5 mb-2 text-2xl font-bold justify-center items-center">
                {currentMap ? currentMap.name : "---"}
                <button onClick={() => { openCurrentModal("RENAME_MAP")}}>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div id="map" className="w-full h-[67vh] mt-[65px] !absolute"></div> {/* NEW CODE: made leaflet map container larger */}
            {currentMap ? <Toolbar /> : null}
            <div className="relative top-[calc(67vh+75px)] z-[3000] flex gap-3 items-center mx-5 my-3"> {/* NEW CODE: made leaflet map container larger */}
                {currentMap ? currentMap.tags.map((tag, key) => {
                    return (
                        <div key = {key} className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                            {tag}
                        </div>
                    )
                }) : null}
                {currentMap && currentMap.tags.length == 0 ? <div className="text-gray-400">No tags</div> : null}
                <button onClick={() => { openCurrentModal("MAP_PROPS_MODAL")}}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {currentModal ? selectModal() : ""}
            {/* {exportType ? exportCurrentMap() : ""} */}
        </div>
    );
};

export default EditMap;
