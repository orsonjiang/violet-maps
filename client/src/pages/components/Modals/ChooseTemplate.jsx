import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createMapTemplate } from "../../../actions/map";
import { openModal, closeModal } from "../../../actions/modal";

const ChooseTemplate = () => {
    const [template, setTemplate] = useState("");

    const chooseTemplate = (t) => {
        setTemplate(t);
    }

    const dispatch = useDispatch()

    const handleClickConfirm = () => {
        dispatch(createMapTemplate(template));
        dispatch(openModal("DATA_PROPS"));
    }

    const closeTemplateModal = () => {
        dispatch(closeModal());
    }

    const selected = "text-left p-2 pt-2 rounded-md bg-indigo-200 h-full border-[1px] border-[#B998EE] drop-shadow-lg";
    const unselected = "text-left p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg";
    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-50 bg-gray-800/[0.6] justify-center items-center w-full h-full inset-0 max-h-full"
        >
            <div className="relative w-full max-w-3xl max-h-md" >
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">

                        <div className="flex flex-col px-4 lg:py-0 space-y-5 my-3">
                            <h3 className="text-lg font-semibold  text-black text-left">
                                Choose Template
                            </h3>
                        </div>
                    </div>

                <div className="grid grid-cols-3 gap-4 px-5">
                    <button onClick={() => chooseTemplate("")} className={`${template == "" ? selected : unselected }`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                            alt="map-image"
                            className="border-[1px] border-[#B998EE]"
                        />
                        <div className="text-sm font-semibold mt-2">Blank Map</div>
                    </button>
                    <button onClick={() => chooseTemplate("heat")} className={`${template == "heat" ? selected : unselected }`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                            alt="map-image"
                            className="border-[1px] border-[#B998EE]"
                        />
                        <div className="text-sm font-semibold mt-2">Heat Map</div>
                    </button>
                    <button onClick={() => chooseTemplate("choropleth")} className={`${template == "choropleth" ? selected : unselected }`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                            alt="map-image"
                            className="border-[1px] border-[#B998EE]"
                        />
                        <div className="text-sm font-semibold mt-2">Choropleth Map</div>
                    </button>
                    <button onClick={() => chooseTemplate("string")} className={`${template == "string" ? selected : unselected }`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                            alt="map-image"
                            className="border-[1px] border-[#B998EE]"
                        />
                        <div className="text-sm font-semibold mt-2">String Map</div>
                    </button>
                    <button onClick={() => chooseTemplate("numerical")} className={`${template == "numerical" ? selected : unselected }`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                            alt="map-image"
                            className="border-[1px] border-[#B998EE]"
                        />
                        <div className="text-sm font-semibold mt-2">Numerical Map</div>
                    </button>
                    <button onClick={() => chooseTemplate("bubble")} className={`${template == "bubble" ? selected : unselected }`}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                            alt="map-image"
                            className="border-[1px] border-[#B998EE]"
                        />
                        <div className="text-sm font-semibold mt-2">Bubble Map</div>
                    </button>
                </div>
                <div className='flex m-4 pb-4'>
                    <div className='flex space-x-2 justify-end text-sm'>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                            onClick={() => handleClickConfirm()}
                        >
                            Confirm
                        </button>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="w-1/2 text-[#686868] bg-[#D9D9D9] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                            onClick={() => closeTemplateModal()}
                        >
                            Cancel
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    )
}

export default ChooseTemplate;