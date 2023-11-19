import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modals/Modal";
import MapProps from "../../components/Modals/MapProps";
import Toolbar from "./components/Toolbar";
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const EditMap = () => {
    const map = useRef(null);
    const [modal, setModal] = useState("");

    useEffect(() => {
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
        }
       
    }, [])

    const setModalType = (type) => {
        
        setModal(type);
    }

    const openModal = () => {
        if (modal == "mapProps"){
            return ( <MapProps /> );
        }
        else if (modal == "rename"){
            return (<Modal title={"Rename Map?"} description={"Write a new name for the Map of Europe"} inputText={"Enter Map Name"} containsInput={true} />);

        }
    }

    return (
        <div className="text-[13px]">
            <div className="flex gap-4 mt-7 mb-4 text-2xl font-bold justify-center items-center">
                Map of Europe
                <button onClick={() => { setModalType("rename")}}>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div id="map" className="w-full h-[60vh] mt-[65px] !absolute"></div>
            <Toolbar />
            <div className="relative top-[calc(60vh+80px)] z-[3000] flex gap-3 items-center mx-5 my-3">
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                    America
                </div>
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                    Population
                </div>
                <button onClick={() => setModalType("mapProps")}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {modal ? openModal() : ""}
        </div>
    );
};

export default EditMap;
