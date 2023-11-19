import { useState } from "react";
import DataInfo from "./DataInfo";

const ChooseTemplate = () => {

    const [content, setContent] = useState("template");

    const changeContent = (step) => {
        if (step === "dataInfo") {
            setContent("dataInfo")
        }
    }


    return (
        <div className="relative w-full max-w-3xl max-h-md" >
            {content == "template" ?
                <div className="relative bg-white rounded-lg shadow ">
                    
                    <div className="p-2 md:mt-0 flex flex-col">

                        <div className="flex flex-col px-4 lg:py-0 space-y-5 my-3">
                            <h3 className="text-lg font-semibold  text-black text-left">
                                Choose Template
                            </h3>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 px-5">
                        <div className="p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                                alt="map-image"
                                className="border-[1px] border-[#B998EE]"
                            />
                            <div className="text-sm font-semibold mt-2">Blank Map</div>
                        </div>
                        <div className="p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                                alt="map-image"
                                className="border-[1px] border-[#B998EE]"
                            />
                            <div className="text-sm font-semibold mt-2">Heat Map</div>
                        </div>
                        <div className="p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                                alt="map-image"
                                className="border-[1px] border-[#B998EE]"
                            />
                            <div className="text-sm font-semibold mt-2">Choropleth Map</div>
                        </div>
                        <div className="p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                                alt="map-image"
                                className="border-[1px] border-[#B998EE]"
                            />
                            <div className="text-sm font-semibold mt-2">Graphic Marker Map</div>
                        </div>
                        <div className="p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                                alt="map-image"
                                className="border-[1px] border-[#B998EE]"
                            />
                            <div className="text-sm font-semibold mt-2">Numerical Map</div>
                        </div>
                        <div className="p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                                alt="map-image"
                                className="border-[1px] border-[#B998EE]"
                            />
                            <div className="text-sm font-semibold mt-2">Bubble Map</div>
                        </div>
                    </div>
                    <div className='flex m-4 pb-4'>
                        <div className='flex space-x-2 justify-end text-sm'>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="w-1/2 text-white bg-accent rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                                onClick={() => { changeContent("dataInfo") }}
                            >
                                Confirm
                            </button>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="w-1/2 text-[#686868] bg-[#D9D9D9] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div> : <DataInfo view={"home"} containsInput={true} />}
        </div>
    )
}

export default ChooseTemplate;