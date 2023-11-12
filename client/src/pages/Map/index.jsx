import CommentCard from "./components/commentcard";
import { useState, useEffect, useRef } from "react";

const Map = () => {
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

    const exportMenu = (
        <div
            ref={ref}
            className="text-xs absolute w-28 left-[-3px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
        >
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        PNG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        JPG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                        JSON
                    </button>
                </li>
            </ul>
        </div>
    )

    return (
        <div className="md:grid grid-cols-3 gap-5 m-10 pb-10 max-md:block">
                <div className='col-span-2'>
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/1024px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                    alt="map-image"
                    className="rounded-lg shadow-md"/>
                    <div className='grid grid-cols-3 grid-row-2 my-4'>
                        <div className='col-span-1 row-span-2'>
                            <h3 className='font-bold text-lg'>Map of Europe</h3>
                            <h4 className="font-medium">Jane Kim</h4>
                            <div className="flex gap-3 items-center mt-3 text-xs whitespace-nowrap">
                                <div className="bg-violet-200 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 dark:bg-violet-600 dark:hover:bg-violet-700">
                                    Heat Map
                                </div>
                                <div className="bg-violet-200 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 dark:bg-violet-600 dark:hover:bg-violet-700">
                                    Europe
                                </div>
                                <div className="bg-violet-200 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 dark:bg-violet-600 dark:hover:bg-violet-700">
                                    Labels
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 flex space-x-2 justify-end text-xs font-medium flex-wrap'>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-up pr-2"></i>98</button>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-down pr-2"></i>15</button>
                            <div className="flex relative">
                                <button onClick={() => {setMenu("export")}} className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'>
                                    <i class="fa-solid fa-file-export pr-2"></i>
                                    Export
                                </button>
                                {menu == "export" ? exportMenu : null}
                            </div>
                        <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i class="fa-solid fa-copy pr-2"></i>Fork</button>
                        </div>
                    </div>
                
                </div>
                <div className='col-span-1 bg-[#8187dc18] rounded-lg self-start'>   
                    <div className="m-5 mb-1">
                        <h3 className="font-semibold pt-5 md:pt-0">25 Comments</h3>
                        <div className="mt-3 flex space-x-4">
                            <button className="font-semibold bg-indigo-300 text-xs p-3 rounded-full shrink-0">
                                {'KF'}
                            </button>
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block px-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                                placeholder="Add a comment..."
                                required=""
                            />
                        </div>
                        <div className="overflow-hidden hover:overflow-y-scroll max-h-[30rem] mt-3">
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        
                        </div>
                
                    </div>
                </div>
        </div>
    );
};

export default Map;
