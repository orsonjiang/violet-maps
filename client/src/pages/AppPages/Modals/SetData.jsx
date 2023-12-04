import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChromePicker } from "react-color"

import { setName, setColor } from "../../../actions/newMap";
import { setMap } from "../../../actions/map";
import apis from "../../../api/api";
import { closeModal } from "../../../helpers";

import Dialog from "./components/Dialog";

const SetData = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const ref = useRef(null);
    
    const [menu, setMenu] = useState("none");
    const [dataPropList, setDataPropList] = useState([]);
    const { newMap } = useSelector((state)=> state.newMap);

    useEffect(()=> {
        const list = []; // list of data props for user to choose
        for (const [key, value] of Object.entries(createMap.properties)) {
            switch (createMap.template) {
                case "string":
                    if (typeof value == "string") {
                        list.push(key);
                    }
                    break;

                case "":
                    if (typeof value == "number" || typeof value == "string") {
                        list.push(key);
                    }
                    break;
                
                default:
                    if (typeof value == "number") {
                        list.push(key);
                    }
                    break;
            }
        }

        setDataPropList(list);
    }, [])

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
    closeMenus(ref);

    const handleNameChange = (event) => {
        dispatch(setName(event.target.value));
    }

    const handleColorChange = (color) => {
        dispatch(setColor(color.hex));
    }

    const handleConfirm = () => {
        apis.createMap(newMap).then((res) => {
            apis.getMap(res.data.id, ['geometry', 'graphics']).then((res1) => {
                dispatch(setMap(res1.data.map));
                navigate("/app/edit");
            }).catch((err)=> console.log(err));
        }).catch((err)=> console.log(err))
        closeModal();
    }

    const DataPropsMenu = (
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

    return (
        <div
            tabIndex={-1}
            className="flex fixed z-50 bg-gray-800/[0.6] justify-center items-center w-full h-full inset-0 max-h-full"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-6 space-y-4 my-3">
                            <h3 className="text-lg font-semibold text-black flex items-center gap-3">
                                Finalize Map Info
                                <div className="text-xs font-medium text-indigo-400">Chosen Template: {newMap.template == "" ? "blank" : newMap.template}</div>
                            </h3>

                            <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                                <div className="text-sm flex gap-3 items-center">
                                    Name:
                                    <input type="text" onChange={handleNameChange} placeholder="Name your map" className="rounded-lg p-1.5 px-3 bg-white w-full" />
                                </div> 
                                {newMap.template != "" ?
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
                                            {dataProp != "N/A" ? dataProp : "N/A"}
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
                                        {menu == "dataProps" ? DataPropsMenu : null}
                                    </div>
                                </div> : null}
                        
                                {newMap.template == "bubble" || newMap.template == "choropleth" ? 
                                <div className="flex gap-4 items-center mb-3 justify-between text-sm">
                                    Select Color: 
                                    <div className="flex relative">
                                        <button onClick={() => { setMenu("color") }} style={{backgroundColor: `${color}`}}className={`w-8 h-8`}></button>
                                        {menu == "color" ? <div ref={ref} className="absolute left-[-3px] z-50 my-10">
                                            <ChromePicker color={color} onChange={handleColorChange} />
                                        </div> : null}
                                    </div>
                                </div> : null}
                          
                            </div>
                            <Dialog confirm={handleConfirm}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetData;
