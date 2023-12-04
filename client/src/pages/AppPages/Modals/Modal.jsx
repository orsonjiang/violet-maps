import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../../../api/api";
import { useNavigate } from 'react-router-dom';

const Modal = ({title, description, inputText, containsInput, type}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);

    const closeCurrentModal = () => {
//         dispatch(closeModal());
    }

    const confirmAction = () => {
        switch (currentModal){
            case 'PUBLISH_MODAL':
                currentMap.publishedDate = new Date();

                apis.updateMap(currentMap._id, currentMap).then((res) => {
                    navigate("/app/home");
                }).catch((err) => console.log(err));

//                 dispatch(closeModal());

                return;

            case 'DELETE_MAP':
                apis.deleteMap(currentMap._id, currentMap).then((res) =>{
                    navigate("/app/home");
                }).catch((err) => console.log(err));

//                 dispatch(closeModal());
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
                                        <input
                                            type="search"
                                            id="search-dropdown"
                                            className="block p-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                                            placeholder={inputText}
                                            required=""
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
