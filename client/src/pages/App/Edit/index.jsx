import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modals/Modal";
import MapProps from "../../components/Modals/MapProps";
import Toolbar from "./components/Toolbar";
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector, useDispatch } from "react-redux";
import { openModal } from '../../../actions/modal';
import geobuf from "geobuf";
import Pbf from "pbf";
// import { updateMapData } from "../../../actions/map";
import { setView } from "../../../actions/home";
// import "../../../dist/Leaflet.BigImage.min.css"
// import "../../../dist/Leaflet.BigImage.min.js"
import { useNavigate } from "react-router-dom";

const EditMap = () => {
    const map = useRef(null);
    const navigate = useNavigate();

    const [geojson, setGeojson] = useState(null);

    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);
    // const exportType = useSelector((state) => state.map.exportType);
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    const openCurrentModal = (type) => {
        dispatch(openModal(type));
    }

    const increaseStroke = (e) => {
        var layer = e.target;

        // increase stroke weight to show that feature can be selected
        layer.setStyle({
            weight: 5,
        })
    }

    const resetStroke = (e) => {
        var layer = e.target;

        // return to original stroke weight
        layer.setStyle({
            weight: 3,
        })
    }

    const clickFeature = (e) => {
        // zoom into feature
        map.current.fitBounds(e.target.getBounds());

    }

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: increaseStroke,
            mouseout: resetStroke,
            click: clickFeature
        })
        if (currentMap.graphics.showLabels) {
            layer.bindTooltip("" + feature.properties[currentMap.graphics.dataProperty], 
                {
                    permanent: true,
                    direction: 'center',
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
                setGeojson(json);
                return json;
            }
            convertToGeoJSON().then((geo) => {
                L.geoJSON(geo, {
                    style: function (feature) {
                        return {
                            color: currentMap.features[geo.features.indexOf(feature)].style.border,
                            fillColor: currentMap.features[geo.features.indexOf(feature)].style.fill,
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

            L.geoJSON(geojson, {
                style: function (feature) {
                    return {
                        color: currentMap.features[geojson.features.indexOf(feature)].style.border,
                        fillColor: currentMap.features[geojson.features.indexOf(feature)].style.fill,
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


    return (
        <div className="text-[13px]">
            <div className="flex gap-4 mt-5 mb-2 text-2xl font-bold justify-center items-center">
                {currentMap ? currentMap.name : "---"}
                <button onClick={() => { openCurrentModal("RENAME_MAP")}}>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div id="map" className="w-full h-[63vh] mt-[65px] !absolute"></div>
            {currentMap ? <Toolbar /> : null}
            <div className="relative top-[calc(63vh+75px)] z-[3000] flex gap-3 items-center mx-5 my-3">
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
