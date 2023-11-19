import { useState } from "react";
import ChooseTemplate from "./ChooseTemplate";
import { closeModal } from "../../../actions/modal";
import { useDispatch } from 'react-redux';

const UploadMap = () => {

    const [content, setContent] = useState("upload");

    const changeContent = (step) => {
        if (step === "template") {
            setContent("template")
        }
    }

    const dispatch = useDispatch()

    const closeUploadModal = () => {
        dispatch(closeModal());
    }

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-50 bg-gray-800/[0.6] justify-center items-center w-full h-full inset-0 max-h-full"
        >
            {content == "upload" ?
                <div className="relative w-full max-w-md max-h-md" >
                    <div className="relative bg-white rounded-lg shadow ">
                        
                        <div className="p-2 md:mt-0 flex flex-col">

                            <div className="flex flex-col px-4 lg:py-0 space-y-5 my-3">
                                <h3 className="text-lg font-semibold  text-black text-left">
                                    Upload Map
                                </h3>


                                <div className="bg-purple-100 rounded-lg p-6 flex justify-center text-center text-[#938F99] border-dotted border-2 border-[#560BAD]">
                                    <div>
                                        <i className="fa-solid fa-cloud-arrow-up text-[2rem] mb-4"></i>
                                        <div className="flex space-x-1">
                                            <p className="font-semibold underline">Click to upload</p>
                                            <p>or drag and drop</p>
                                        </div>
                                        <p className="text-sm">.JSON, .GEOJSON, .SHP/.DBF, .KML</p>
                                    </div>
                                </div>

                                <div className='grid grid-cols-4 grid-row-1 my-4'>
                                    <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                        <button
                                            data-modal-hide="popup-modal"
                                            type="button"
                                            className="w-1/2 text-white bg-accent rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                                            onClick={() => { changeContent("template") }}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            data-modal-hide="popup-modal"
                                            type="button"
                                            className="w-1/2 text-[#686868] bg-[#D9D9D9] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                                            onClick={closeUploadModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                : <ChooseTemplate />}
        </div>
    );
};

export default UploadMap;
