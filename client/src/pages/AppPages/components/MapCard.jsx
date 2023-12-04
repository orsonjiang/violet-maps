import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import apis from "../../../api/api";
import { setMap } from "../../../actions/map";

// TODO: Make menu work.
const MapCard = ({ mapInfo }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef(null);

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

    closeMenus(ref);

    const handleClickCard = () => {
        apis.getMap(mapInfo._id).then((res) => {
            dispatch(setMap(res.data.map));
            console.log(mapInfo)
            if (mapInfo.soical.publishedDate) {
                navigate("/app/map");
            } else {
                navigate("/app/edit");
            }
        }).catch((err)=> console.log(err));
        
    }
    
    const handleMenuMapCard = (event) => {
        event.stopPropagation();
        setMenu("mapCard");
    }

    return (
        <div>
            <div onClick={handleClickCard} className={`p-1 pt-1 rounded-md h-full drop-shadow-sm ${mapInfo.publishedDate == null ? "border-2 border-violet-200 bg-white" : "border-2 border-indigo-300 bg-indigo-300/[0.9]"}`}>
                <div className="relative">
                    <button 
                        onClick={handleMenuMapCard}
                        className="absolute right-2"
                    >
                        <i className="fas fa-ellipsis-h w-3 mr-1 text-white"/>
                    </button>
                    {/* Dropdown menu */}
                    {menu == "mapCard" ?
                    <div
                        ref={ref}
                        className="absolute right-1 z-50 my-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
                        id="user-dropdown"
                    >
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a
                                    href="#"
                                    className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                    onClick={() => { setModal("fork") }}
                                >
                                    <i className="fa fa-code-fork mr-2" />
                                    Fork
                                </a>
                            </li>
                            <li >
                                <a
                                    href="#"
                                    className="block px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                    onClick={() => {setModal("rename")}}
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
                    className="rounded-md w-full"
                />
                <div className="mx-3 mt-3">
                    <div className={`${mapInfo.publishedDate == null ? "black" : "text-white font-medium"}`}>
                        {mapInfo.name}
                    </div>
                    <div className={`text-[13px] pt-1 ${mapInfo.publishedDate == null ? "text-violet-400" : "text-white font-medium"}`}>
                        {mapInfo.username}
                    </div>
                    <div className="flex mt-3 pb-4 gap-2 overflow-x-auto">
                        {mapInfo.tags.length != 0 ? mapInfo.tags.map((tag, index) => {
                            return (<div key={index} className={`text-xs ${mapInfo.publishedDate == null? "bg-violet-200" : "bg-white/[0.8]"} w-fit py-1 px-2 rounded-full`}>{tag}</div>)
                        }) : <div className={`text-xs ${mapInfo.publishedDate == null ? "text-gray-300" : "text-white/[0.6]"}`}>No tags</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapCard;
