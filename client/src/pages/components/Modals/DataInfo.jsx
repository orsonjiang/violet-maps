import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color"

const DataInfo = ({view, containsInput}) => {
    const [menu, setMenu] = useState("none");
    const [dataProp, setDataProp] = useState("");
    const [name, setName] = useState("");

    const closeMenus = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenu("none");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref])
    }

    const ref = useRef(null);
    closeMenus(ref);

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(name);
    }

    const dataPropsMenu = (
        <div
            id="sort-by-dropdown"
            ref={ref}
            className="absolute w-full right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow "
        >
            <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdown-button"
            >
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        name
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        gdp_value
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        pop_year
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        admin_0
                    </button>
                </li>
            </ul>
        </div>
    )
    
    const styling = "flex fixed z-50 justify-center items-center w-full h-full inset-0 max-h-full " ;
    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className={view == "home" ? styling : (styling + "bg-gray-800/[0.6]")}
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-6 space-y-4 my-3">
                            <h3 className="text-lg font-semibold text-black">
                                Select Data Properties
                            </h3>
                            <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                                {containsInput ? 
                                    <div className="text-sm flex gap-3 items-center">
                                        Name:
                                        <input type="text" onChange={handleNameChange} placeholder="Name your map" className="rounded-lg p-1.5 px-3 bg-white w-full" />
                                    </div> : "" }

                            <div className="text-sm flex gap-3 items-center justify-between">
                                Data Property:
                                <div className="relative">
                                    <button
                                        id="dropdown-button"
                                        data-dropdown-toggle="dropdown"
                                        className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-500 focus:outline-none "
                                        type="button"
                                        onClick={() => { setMenu("dataProps") }}
                                    >
                                        gdp_value
                                        <svg
                                            className="w-2.5 h-2.5 ms-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {menu == "dataProps" ? dataPropsMenu : null}
                                </div>
                            </div>
                    
                              
                            <div className="flex gap-4 items-center mb-3 justify-between text-sm">
                                Select Color: 
                                <div className="flex relative">
                                    <button onClick={() => { setMenu("color") }} className={`w-8 h-8 bg-purple-300`}></button>
                                    {menu == "color" ? <div ref={ref} className="absolute left-[-3px] z-50 my-10"><ChromePicker /></div> : null}
                                </div>
                                
                            </div>
                          
                            </div>
                            <div className='grid grid-cols-4 grid-row-1 py-1'>
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
                                        className="w-1/2 text-[#686868] bg-gray-200 rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
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

export default DataInfo;
