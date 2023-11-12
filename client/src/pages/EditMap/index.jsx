import { useState, useEffect, useRef } from "react";

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
            <div className="flex flex-wrap bg-white p-2 px-4 my-2 justify-between rounded-lg border-2 border-violet-200 drop-shadow-sm">
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
                <button className="px-1 hover:bg-violet-100">Region Color</button>
                {border}
                <button className="px-1 hover:bg-violet-100">Border Color</button>
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
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/2560px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                alt="map-image"
                className="object-scale-down p-2"
            />
            <div className="flex gap-2 items-center">
                <div className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    America
                </div>
                <div className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    Labels
                </div>
                <i className="fa-solid fa-plus"></i>
            </div>
        </div>
    );
};

export default EditMap;
