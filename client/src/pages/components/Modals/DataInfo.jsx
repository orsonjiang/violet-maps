import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color"
import { useSelector, useDispatch } from 'react-redux';
import { createMapProperties } from "../../../actions/map";
import { closeModal } from "../../../actions/modal";
import apis from "../../../api/api";

const DataInfo = ({view, containsInput}) => {
    const [menu, setMenu] = useState("none");
    const [dataPropList, setDataPropList] = useState([]);
    const [dataProp, setDataProp] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("#D8B4FE");

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

    const newMap = useSelector((state)=> state.map.newMap);

    useEffect(()=> {
        const list = [];
        if (newMap.data.features.length > 0) { // does it have at least one feature?
            const props = newMap.data.features[0].properties;
            if (newMap.template == "string") {
                for (const [key, value] of Object.entries(props)) {
                    if (typeof value == "string") {
                        list.push(key);
                    }
                }
            } else if (newMap.template == "") {
                for (const [key, value] of Object.entries(props)) {
                    if (typeof value == "number" || typeof value == "string") {
                        list.push(key + " " + value);
                    }
                }
            } else { // the rest of the templates need numerical data
                for (const [key, value] of Object.entries(props)) {
                    if (typeof value == "number") {
                        list.push(key);
                    }
                }
            }
        }
        setDataPropList(list);
        if (list.length > 0) {
            setDataProp(list[0]);
        }
    }, [])

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleColorChange = (color) => {
        setColor(color.hex);
    }

    const dataPropsMenu = (
        <div
            id="sort-by-dropdown"
            ref={ref}
            className="absolute right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow "
        >
            <ul
                className="overflow-y-auto max-h-48 py-2 w-fit text-sm text-gray-700 h-"
                aria-labelledby="dropdown-button"
            >
                {dataPropList.map((item, index) => {
                    return (
                        <li key={index}>
                            <button
                                onClick={() => {setDataProp(item)}}
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                            >
                                {item}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

    const dispatch = useDispatch()

    useEffect(() => {
        if (newMap.name != "") {
            apis.postCreateMap(newMap);
            dispatch(closeModal());
        }
    }, [newMap.name])

    const handleClickConfirm = () => {
        dispatch(createMapProperties({
            name: name,
            dataProperty: dataProp,
            color: color
        }));
    }

    const closeDataInfoModal = () => {
        dispatch(closeModal());
    }

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-50 bg-gray-800/[0.6] justify-center items-center w-full h-full inset-0 max-h-full"
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
                                        {dataProp != null ? dataProp : "N/A"}
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
                                    <button onClick={() => { setMenu("color") }} style={{backgroundColor: `${color}`}}className={`w-8 h-8`}></button>
                                    {menu == "color" ? <div ref={ref} className="absolute left-[-3px] z-50 my-10">
                                        <ChromePicker color={color} onChange={handleColorChange} />
                                    </div> : null}
                                </div>
                                
                            </div>
                          
                            </div>
                            <div className='grid grid-cols-4 grid-row-1 py-1'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                                        onClick={handleClickConfirm}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-[#686868] bg-gray-200 rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                                        onClick={closeDataInfoModal}
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
