import CommentCard from "./components/CommentCard";
import Modal from "../../components/Modals/Modal";
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../actions/modal";
import * as L from 'leaflet';
import { setView } from "../../../actions/home";

const Map = () => {
    const map = useRef(null);
    const [menu, setMenu] = useState("none");

    const currentModal = useSelector((state) => state.modal.currentModal);

    const dispatch = useDispatch();

    const openCurrentModal = (type) => {
        dispatch(openModal(type))
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

            // L.control.browserPrint().addTo(map);
        }
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
                        <h3 className='font-semibold text-lg'>Map of Europe</h3>
                        <h4 className="">Jane Kim</h4>
                        <div className="flex gap-3 items-center mt-3 text-xs whitespace-nowrap">
                            <div className=" bg-violet-200 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                                Heat Map
                            </div>
                            <div className=" bg-violet-200 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                                Europe
                            </div>
                            <div className="bg-violet-200 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 ">
                                Labels
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 flex space-x-2 justify-end text-xs font-medium flex-wrap'>
                        <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-up pr-2"></i>98</button>
                        <button className='rounded-full bg-accent py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-down pr-2"></i>15</button>
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
                    <h3 className="font-medium pt-5 md:pt-0">25 Comments</h3>
                    <div className="mt-3 flex space-x-4">
                        <button className="font-semibold bg-indigo-300 text-xs w-10 h-10 rounded-full shrink-0">
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
                    <div className="overflow-hidden hover:overflow-y-scroll max-h-[30rem] mt-3 space-y-2">
                        <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'KF'} name={'Kayla Fang'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'RC'} name={'Rachel Cong'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'KY'} name={'Katlyn Ye'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'KC'} name={'Kevin Chen'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'OJ'} name={'Orson Jiang'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'KC'} name={'Kevin Chen'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'KY'} name={'Katlyn Ye'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Map;
