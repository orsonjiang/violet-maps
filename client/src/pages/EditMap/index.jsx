import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color"
import Modal from "../components/Modal";

const EditMap = () => {
    const [menu, setMenu] = useState("none");

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

    const border = (
        <div className="w-0.5 h-6 bg-gray-100 mx-1"></div>
    );

    const fontStyleMenu = (
        <div
            ref={ref}
            className="absolute overflow-y-auto max-h-44 w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Arial
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Times New Roman
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Helvetica
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Poppins
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Verdana
                    </button>
                </li>
            </ul>
        </div>
    )

    const labelPositionMenu = (
        <div
            ref={ref}
            className="absolute overflow-y-auto max-h-44 w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Center
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Right
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Left
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        Top
                    </button>
                </li>
            </ul>
        </div>
    )

    const dataPropertyMenu = (
        <div
            ref={ref}
            className="absolute w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
        >
            <ul className="text-[13px] overflow-y-auto max-h-[136px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        name
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        gdp_value
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        pop_year
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        admin_0
                    </button>
                </li>
            </ul>
            <div className="px-4 py-3 hover:bg-gray-100 rounded-lg ">
                <button className="block text-violet-500 text-xs text-gray-900 dark:text-white">
                    + New Data Property
                </button>
            </div>
        </div>
    )

    return (
        <div className="m-4 text-[13px]">
            <div className="flex gap-4 my-5 text-2xl font-bold justify-center items-center">
                Map of Europe
                <button>
                    <i className="fa fa-edit mr-2 text-xl text-indigo-500" />
                </button>
            </div>
            <div className="flex flex-wrap bg-white p-2 px-4 m-2 justify-between rounded-lg border-[1px] border-violet-200 drop-shadow-sm">
                <button className="px-1">
                    <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button className="px-1">
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100">Show Labels</button>
                {border}
                <button className="px-1 hover:bg-violet-100">Add Text</button>
                {border}
                <div className="flex px-1 relative">
                    <button 
                        onClick={() => {setMenu("fontStyle")}}
                        className="flex gap-2 items-center"
                    >
                        Arial
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {/* Dropdown menu */}
                    {menu == "fontStyle" ? fontStyleMenu : null}
                </div>
                {border}
                <button className="px-1" >
                    <i className="fa-solid fa-minus"></i>
                </button>
                <input
                    type="text"
                    value={12}
                    maxLength={2}
                    className="w-6 text-center"
                />
                <button className="px-1">
                    <i className="fa-solid fa-plus"></i>
                </button>
                {border}
                <div className="flex px-1 relative">
                    <button 
                        onClick={() => {setMenu("labelPosition")}}
                        className="flex gap-2 items-center"
                    >
                        Center
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {menu == "labelPosition" ? labelPositionMenu : null}
                </div>
                {border}
                <div className="flex relative">
                    <button 
                        onClick={() => {setMenu("regionColor")}}
                        className="px-1 hover:bg-violet-100"
                    >
                        Region Color
                    </button>
                    {menu == "regionColor" ? <div ref={ref} className="absolute left-[-5px] z-50 my-9"><ChromePicker /></div> : null}
                </div>
                {border}
                <div className="flex relative">
                    <button 
                        onClick={() => {setMenu("borderColor")}}
                        className="px-1 hover:bg-violet-100"
                    >
                        Border Color
                    </button>
                    {menu == "borderColor" ? <div ref={ref} className="absolute left-[-5px] z-50 my-9"><ChromePicker /></div> : null}
                </div>
                {border}
                <button className="px-1 hover:bg-violet-100">Legend</button>
                {border}
                <div className="flex px-1 relative">
                    <button 
                        onClick={() => {setMenu("dataProperty")}}
                        className="flex gap-2 items-center"
                    >
                        GDP_Value
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {menu == "dataProperty" ? dataPropertyMenu : null}
                </div>
                {border}
                <button className="px-1 hover:bg-violet-100">
                    <i className="fa-solid fa-plus mr-1.5"></i>
                    Bubbles
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100">
                    <i className="fa-solid fa-plus mr-1.5"></i>
                    Heat Map
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100">Publish</button>
                {border}
                <button className="px-1">
                    <i className="fa-solid fa-download"></i>
                </button>
                <button className="px-1">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
            <div className="w-full p-4 rounded">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/2560px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                    alt="map-image"
                    className="rounded-lg"
                />
            </div>
            <div className="flex gap-3 items-center mx-3 my-3">
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 dark:bg-violet-600 dark:hover:bg-violet-700">
                    America
                </div>
                <div className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 dark:bg-violet-600 dark:hover:bg-violet-700">
                    Population
                </div>
                <button>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {/* Modals */}
            {/* <Modal title={"Rename Map?"} description={"Confirm by typing a name for the Map of Europe"} inputText={"Enter Map Name"} containsInput={true} /> */}
            {/* <Modal title={"Add/Edit Label for Region"} description={"Adding value to data property: gdp_value"} inputText={"Enter Value"} containsInput={true} /> */}
            {/* <Modal title={"Add New Data Property"} description={"Enter a name for your property"} inputText={"Enter Name"} containsInput={true} /> */}
            {/* <Modal title={"Delete Map?"} description={"Please confirm that you want to delete the map."} containsInput={false} /> */}
        </div>
    );
};

export default EditMap;
