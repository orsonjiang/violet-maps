import { useState, useEffect, useRef } from "react";

const MapCard = ({ mapInfo }) => {
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

    return (
        <div>
            <div className="p-1 pt-1 rounded-md bg-white">
                <div className="relative">
                    <button 
                        onClick={() => {setMenu("mapcard")}}
                        className="absolute right-2"
                    >
                        <i className="fas fa-ellipsis-h w-3 mr-1 text-white"/>
                    </button>
                    {/* Dropdown menu */}
                    {menu == "mapcard" ?
                    <div
                        ref={ref}
                        className="absolute right-1 z-50 my-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="user-dropdown"
                    >
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a
                                    href="#"
                                    className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    <i className="fa fa-code-fork mr-2" />
                                    Fork
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    <i className="fa fa-edit mr-2" />
                                    Rename
                                </a>
                            </li>
                            
                        </ul>
                    </div> : null}
                </div>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                    alt="map-image"
                    className="rounded-md"
                />
                <div className="m-3">
                    <div>
                        {mapInfo.name}
                    </div>
                    <div className="text-sm font-medium text-violet-400">
                        {mapInfo.owner}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapCard;
