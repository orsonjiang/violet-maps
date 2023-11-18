import { useState } from "react";
import Modal from "../../components/Modals/Modal";
import MapProps from "../../components/Modals/MapProps";
import Toolbar from "./components/Toolbar";

const EditMap = () => {
    const [modal, setModal] = useState("");

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
        <div className="m-4 text-[13px]">
            {/* {modal == "text" ? 
                <Modal title={"Add/Edit Label for Region"} description={"Enter in value for the label"} containsInput={true} /> 
                ? (modal == "dataProp" ? <Modal title={"Add New Data Property"} description={"Enter a name for your property"} containsInput={true}/> :
             : ""} */}
            {modal ? openModal() : ""}
            <div className="flex gap-4 my-5 text-2xl font-bold justify-center items-center">
                Map of Europe
                <button onClick={() => { setModalType("rename")}}>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <Toolbar />
            <div className="w-full p-4 rounded">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/2560px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                    alt="map-image"
                    className="rounded-lg"
                />
            </div>
            <div className="flex gap-3 items-center mx-3 my-3">
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                    America
                </div>
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                    Population
                </div>
                <button onClick={() => setModal("mapProps")}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    );
};

export default EditMap;
