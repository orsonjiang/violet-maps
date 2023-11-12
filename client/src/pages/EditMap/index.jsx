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
                <button className="px-1 flex gap-2 items-center">
                    Arial
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                </button>
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
                <button className="px-1 flex gap-2 items-center">
                    Center
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100">Region Color</button>
                {border}
                <button className="px-1 hover:bg-violet-100">Border Color</button>
                {border}
                <button className="px-1 hover:bg-violet-100">Legend</button>
                {border}
                <button className="px-1 flex gap-2 items-center">
                    GDP_Value
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                </button>
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
