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
import { updateMapData } from "../../../actions/map";
import { setView } from "../../../actions/home";

const EditMap = () => {
    const map = useRef(null);

    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);

    const dispatch = useDispatch();

    const openCurrentModal = (type) => {
        dispatch(openModal(type));
    }

    useEffect(() => {
        dispatch(setView("NONE"));
        if (!map.current) {
            map.current = L.map('map').setView([39.74739, -105], 2);

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
                var geojson = geobuf.decode(new Pbf(bufView));
                return geojson;
            }
            convertToGeoJSON().then((geojson) => {
                L.geoJSON(geojson, {
                    style: function (feature) {
                        return {
                            color: currentMap.features[geojson.features.indexOf(feature)].style.border,
                            fillColor: currentMap.features[geojson.features.indexOf(feature)].style.fill,
                        }
                    },
                    onEachFeature: (feature, layer) => {
                        if (currentMap.graphics.showLabels) {
                            layer.bindTooltip("" + feature.properties[currentMap.graphics.dataProperty], 
                                {
                                    permanent: true,
                                    direction: 'center',
                                })
                        }
                    }
                }).addTo(map.current);
                // current map in the store would now have the map data in geojson
                dispatch(updateMapData(geojson));
            })
        }
    }, [])


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
                {currentMap.name}
                <button onClick={() => { openCurrentModal("RENAME_MAP")}}>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div id="map" className="w-full h-[63vh] mt-[65px] !absolute"></div>
            <Toolbar />
            <div className="relative top-[calc(63vh+75px)] z-[3000] flex gap-3 items-center mx-5 my-3">
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                    America
                </div>
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                    Population
                </div>
                <button onClick={() => { openCurrentModal("MAP_PROPS_MODAL")}}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {currentModal ? selectModal() : ""}
        </div>
    );
};

export default EditMap;
