import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import apis from "../../../api/api";

import { closeModal } from "../../../actions/modal";
import { setView } from "../../../actions/home";
import { updateMapInStore } from "../../../actions/map";

const Modal = ({title, description, inputText, containsInput, type}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentModal = useSelector((state) => state.modal.currentModal);
    const {currentMap, selectedFeature} = useSelector((state) => state.map); // NEW CODE

    const updates = useRef(null); // NEW CODE - holds the updates without touching the store directly
    const [text, setText] = useState(currentMap.features[selectedFeature.featureRef.feature.properties.index].properties[currentMap.graphics.dataProperty]); // NEW CODE - for the text input, contains initial value

    // NEW CODE - sets up the updates object
    useEffect(() => {
        if (!updates.current) {
            updates.current = { ...currentMap };
            delete updates.current["data"];
        }
    }, [])

    const closeCurrentModal = () => {
        dispatch(closeModal());
    }

    const confirmAction = () => {
        switch (currentModal){
            case "TEXT_MODAL": // NEW CODE - add/edit text of region
                const idx = selectedFeature.featureRef.feature.properties.index; // get index of selected feature
                updates.current.features[idx].properties[currentMap.graphics.dataProperty] = text;

                apis.updateMap(currentMap._id, updates.current).then((res) => {
                    dispatch(updateMapInStore(updates.current))
                }).catch((err) => {
                    console.log(err);
                })
                dispatch(closeModal());
                return;

            case 'PUBLISH_MODAL': // NEW CODE
                updates.current.publishedDate = new Date(); 

                apis.updateMap(currentMap._id, updates.current).then((res) => {
                    dispatch(updateMapInStore(updates.current))
                    navigate("/app/home");
                    dispatch(setView("HOME"))
                }).catch((err) => console.log(err));
                dispatch(closeModal());

                return;

            case 'DELETE_MAP':
                apis.deleteMap(currentMap._id, currentMap).then((res) =>{
                    navigate("/app/home");
                    dispatch(setView("HOME"))
                }).catch((err) => console.log(err));

                dispatch(closeModal());
                return;
                
            default:
                return;
        }
    }


    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-[4000] justify-center items-center w-full h-full bg-gray-800/[0.6] inset-0 max-h-full"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-6 space-y-4 my-3">
                            <h3 className="text-lg font-semibold text-black">
                                {title}
                            </h3>
                            <div className="text-[15px] bg-purple-100 rounded-lg py-3 px-5 justify-center">
                                {description}
                                {containsInput ?
                                    <div className="mt-3 mb-2">
                                        <input // NEW CODE
                                            type="search"
                                            id="search-dropdown"
                                            className="block p-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                                            placeholder={inputText}
                                            required=""
                                            value = {text}
                                            onChange = {(e) => (setText(e.target.value))}
                                        />
                                    </div> : ""}
                                
                            </div>
                            
                            <div className='grid grid-cols-4 grid-row-1 py-1'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium" onClick={confirmAction}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-[#686868] bg-gray-200 rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium" onClick={closeCurrentModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
