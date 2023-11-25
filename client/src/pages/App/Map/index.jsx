import CommentCard from "./components/CommentCard";
import Modal from "../../components/Modals/Modal";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../actions/modal";
import * as L from 'leaflet';
import "../../../dist/leaflet.browser.print.min.js"
import { setView } from "../../../actions/home";
import { addComment } from "../../../actions/map.js";
import apis from "../../../api/api.js";

const Map = () => {
    const map = useRef(null);
    const [menu, setMenu] = useState("none");
    const [text, setText] = useState("");

    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);
    const { user } = useSelector((state) => state.user);


    const dispatch = useDispatch();

    const openCurrentModal = (type) => {
        dispatch(openModal(type))
    }

    const handleUpdateText = (event) => {
        setText(event.target.value);
    }

    const handleAddComment = (event) => {
        if (event.code === "Enter"){
            console.log(text);
            console.log(user);

            const initials = user.firstName.charAt(0) + user.lastName.charAt(0);

            const newComment = {
                comment: text,
                userReference: user,
                username: user.username,
                userInitial: initials,
                datePublished: new Date()
            }

            currentMap.social.comments.unshift(newComment);
            console.log(currentMap);

            apis.updateMapByID(currentMap._id, currentMap).then((res) => {

                dispatch(addComment(currentMap.social.comments))
                ref.current.value = "";
            
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        dispatch(setView("NONE"));
        if (!map.current) {
            map.current = L.map('map').setView([39.74739, -105], 2);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map.current);

            var southWest = L.latLng(-90, -180);
            var northEast = L.latLng(90, 180);
            var bounds = L.latLngBounds(southWest, northEast);

            map.current.setMaxBounds(bounds);
            map.current.on('drag', function () {
                map.current.panInsideBounds(bounds, { animate: false });
            });

            // L.control.browserPrint().addTo(map.current);
            // console.log(map.current);


        }

        console.log(currentMap);

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

    const ref = useRef(null);
    closeMenus(ref);

    const exportMenu = (
        <div
            ref={ref}
            className="absolute w-28 left-[-3px] z-50 my-9 text-xs list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        PNG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        JPG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        JSON
                    </button>
                </li>
            </ul>
        </div>
    )

    return (
        <div className="md:grid grid-cols-3 gap-5 m-10 pb-10 max-md:block">
            {currentModal == "FORK_MODAL" ? <Modal title={"Fork Map?"} description={"Confirm by typing a name for the Map of Europe"} inputText={"Enter Map Name"} containsInput={true} /> : ""}
            <div className='col-span-2'>
                <div id="map" className="h-[60vh] rounded-lg shadow-md"></div>
                <div className='grid grid-cols-3 grid-row-2 my-4'>
                    <div className='col-span-1 row-span-2'>
                        <h3 className='font-semibold text-lg'>{currentMap.name}</h3>
                        <h4 className="">{currentMap.username}</h4>
                        <div className="flex gap-3 items-center mt-3 text-xs whitespace-nowrap">
                    
                            {currentMap.tags.length != 0 ? currentMap.tags.map((name) => {
                                return ( <div className=" bg-violet-200 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                                    {name}
                                </div>)
                            }) : (<div className="text-xs text-gray-300">No tags</div>)}
                        </div>
                    </div>
                    <div className='col-span-2 flex space-x-2 justify-end text-xs font-medium flex-wrap'>
                        <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-up pr-2"></i>{currentMap.social.likes}</button>
                        <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-down pr-2"></i>{currentMap.social.dislikes}</button>
                        <div className="flex relative">
                            <button onClick={() => { setMenu("export") }} className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white'>
                                <i class="fa-solid fa-file-export pr-2"></i>
                                Export
                            </button>
                            {menu == "export" ? exportMenu : null}
                        </div>
                        <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white' onClick={() => { openCurrentModal("FORK_MODAL") }}><i class="fa-solid fa-copy pr-2" ></i>Fork</button>
                    </div>
                </div>

            </div>
            <div className='col-span-1 bg-violet-100 rounded-lg self-start'>
                <div className="m-5 mb-1">
                    <h3 className="font-medium pt-5 md:pt-0">{`${currentMap.social.comments.length} Comments`}</h3>
                    <div className="mt-3 flex space-x-4">
                        <button className="flex gap-[1px] items-center justify-center h-10 w-10 shadow-none hover:shadow-none font-semibold bg-indigo-200 text-xs p-2 rounded-full shrink-0">
                            <p>{user.firstName.charAt(0)}</p>
                            <p>{user.lastName.charAt(0)}</p>
                        </button>
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block px-3 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                            placeholder="Add a comment..."
                            required=""
                            ref={ref}
                            onChange={handleUpdateText}
                            onKeyDown={handleAddComment}
                        />
                    </div>
                    <div className="overflow-hidden hover:overflow-y-scroll max-h-[30rem] mt-3 space-y-2">
                        {currentMap.social.comments.map((c) => {
                            return <CommentCard initials={c.userInitial} name={c.username} comment={c.comment} />
                        })}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Map;
