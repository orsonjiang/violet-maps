import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modals/Modal";
import MapProps from "../../components/Modals/MapProps";
import Toolbar from "./components/Toolbar";
import Tags from "./components/Tags.jsx";

// Leaflet Map libraries
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../../../../choropleth.js";
import domtoimage from "dom-to-image";

import geobuf from "geobuf";
import Pbf from "pbf";
// import { updateMapData } from "../../../actions/map";

import { setView } from "../../../actions/home";
import { openModal } from '../../../actions/modal';
import { updateSelectedFeature } from "../../../actions/map";
import { updateMapInStore } from "../../../actions/map";

import apis from "../../../api/api.js";

const EditMap = () => {
    const map = useRef(null);
    const mapContainer = useRef(null);
    const navigate = useNavigate();

    const [geojson, setGeojson] = useState(null);

    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);
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
            map.current = L.map('map', {preferCanvas: true}).setView([39.74739, -105], 2);

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
            
            // get the map data from the store and convert back to geojson
            const convertToGeoJSON = async () => {
                //convert from base64 back to string
                let str = atob(currentMap.data);
                let buf = new ArrayBuffer(str.length);
                let bufView = new Uint8Array(buf);
                for (var i=0; i<str.length; i++) {
                    bufView[i] = str.charCodeAt(i);
                }

                // const stream = new Blob([buf], {
                //     type: "application/json",
                // }).stream();

                // // decompress
                // const decompress = stream.pipeThrough(
                //     new DecompressionStream("gzip")
                // );

                // const resp = await new Response(decompress);
                // const blob = await resp.blob();
                // const buffer = await blob.arrayBuffer();
                // const arr = new Uint8Array(buffer)
                var json = geobuf.decode(new Pbf(bufView));
                // NEW CODE - replace original geojson features with our custom one
                for (let i = 0; i < json.features.length; i++) {
                    json.features[i].properties = currentMap.features[i].properties;
                }
                setGeojson(json);
                return json;
            }
            convertToGeoJSON().then((geo) => {
                if (currentMap.graphics.choropleth) { // NEW CODE: if there is a choropleth map, display this layer
                    L.choropleth(geo, {
                        valueProperty: currentMap.graphics.choropleth.dataProperty,
                        scale: ['white', currentMap.graphics.choropleth.color],
                        steps: 6,
                        mode: 'q',
                        style: {
                            fillOpacity: 0.9
                        },
                      }).addTo(map.current)
                }
                
                L.geoJSON(geo, {
                    style: function (feature) {
                        return {
                            color: currentMap.features[geo.features.indexOf(feature)].style.border,
                            fillColor: currentMap.features[geo.features.indexOf(feature)].style.fill,
                            fillOpacity: 0.9 // NEW CODE
                        }
                    },
                    onEachFeature: onEachFeature
                }).addTo(map.current);
                // current map in the store would now have the map data in geojson
                // dispatch(updateMapData(geojson));
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
            if (currentMap.graphics.choropleth) { // NEW CODE: if there is a choropleth map, display this layer
                L.choropleth(geojson, {
                    valueProperty: currentMap.graphics.choropleth.dataProperty,
                    scale: ['white', currentMap.graphics.choropleth.color],
                    steps: 6,
                    mode: 'q',
                    style: {
                        fillOpacity: 0.9
                    },
                  }).addTo(map.current)
            }
            L.geoJSON(geojson, {
                style: function (feature) {
                    return {
                        color: currentMap.features[geojson.features.indexOf(feature)].style.border,
                        fillColor: currentMap.features[geojson.features.indexOf(feature)].style.fill,
                        fillOpacity: 0.9 // NEW CODE
                    }
                },
                onEachFeature: onEachFeature
            }).addTo(map.current);

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

    // NEW CODE - EXPORT MAP
    const handlePrintMap = (type, download) => {

        const options = {
            filter: (node) => {
                console.log(node.classList);
                return !(node.classList.contains("leaflet-control-container")) // remove leaflet zoom toolbar from image
            },
            width: mapContainer.current.clientWidth * 1,
            height: mapContainer.current.clientHeight * 1.5
        }

        domtoimage.toPng(mapContainer.current, options)
            .then((dataUrl) => {
                if (download) {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `${currentMap.name}.${type.toLowerCase()}`;
                    link.click();
                }
                else{
                    const updates = { ...currentMap };
                    delete updates["data"];

                    updates.imageFile = dataUrl;
                    console.log(updates);
                    apis.updateMap(currentMap._id, updates).then((res) => {
                        console.log(res);
                        dispatch(updateMapInStore(updates))
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
    }


    return (
        <div className="text-[13px]">
            <div className="flex gap-4 mt-5 mb-2 text-2xl font-bold justify-center items-center">
                {currentMap ? currentMap.name : "---"}
                <button onClick={() => { openCurrentModal("RENAME_MAP")}}>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div id="map" ref={mapContainer} className="w-full h-[67vh] mt-[65px] !absolute"></div> {/* NEW CODE: made leaflet map container larger */}
            {currentMap ? <Toolbar exportMap={handlePrintMap}/> : null}
            <div className="relative top-[calc(67vh+75px)] z-[3000] gap-3 flex justify-between items-center mx-5 my-3"> {/* NEW CODE: made leaflet map container larger */}
                <Tags />
                {/* NEW CODE - EXPORT MAP */}
                <div> 
                    <button className='h-fit py-1.5 px-2 rounded-lg text-white text-xs bg-indigo-400 hover:bg-indigo-500' onClick={() => handlePrintMap("PNG", false)}>Set Thumbnail</button>
                </div>
            </div>
           
            {currentModal ? selectModal() : ""}
        </div>
    );
};

export default EditMap;
