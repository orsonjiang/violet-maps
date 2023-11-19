const MapProps = () => {
    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-[4000] justify-center items-center w-full h-full inset-0 max-h-full bg-gray-800/[0.6]"
        >
            <div className="relative w-full max-w-sm max-h-full ">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-4 lg:py-0 space-y-5 my-3">
                            <h3 className="text-lg font-semibold  text-black text-left">
                                Map Properties
                            </h3>
                            <div className="bg-[#F3E7FF] rounded-lg p-4 justify-center">
                                <ol className="text-sm list-decimal mx-4 space-y-2">
                                    <li>
                                        <div className="flex justify-between">
                                            <div>America</div>
                                            <button><i className="fa-solid fa-pencil "></i></button>
                                        </div>
                                      
                                    </li>
                                    <li>
                                        <div className="flex justify-between">
                                            <div>Population</div>
                                            <button><i className="fa-solid fa-pencil "></i></button>
                                        </div>

                                    </li>
                                    <li>
                                        <div className="my-2">
                                            <input
                                                type="search"
                                                id="search-dropdown"
                                                className="block p-2 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                                                placeholder="Enter Map Property"
                                                required=""
                                            />
                                        </div>
                                    </li>
                                </ol>
                                
                             

                            </div>

                            <div className='grid grid-cols-4 grid-row-1 my-4'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapProps;