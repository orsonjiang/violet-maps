import MapCard from './components/MapCard';
import UploadMap from '../components/Modals/UploadMap';
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    const [menu, setMenu] = useState("none");
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

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

    const exampleListOfMaps = [
        {
            id: 0,
            name: 'Map of Europe',
            owner: 'Fanny Li',
            publishedDate: null,
            tags: ['Europe', 'Population'],
        },
        {
            id: 0,
            name: 'Map of China',
            owner: 'Kevin Chen',
            publishedDate: new Date(),
            tags: ['China', 'Population'],
        },
        {
            id: 0,
            name: 'Map of USA',
            owner: 'Kayla Fang',
            publishedDate: null,
            tags: ['USA', 'Population'],
        },
        {
            id: 0,
            name: 'Map of Korea',
            owner: 'Orson Jiang',
            publishedDate: null,
            tags: ['Korea', 'Population'],
        },
        {
            id: 0,
            name: 'This is the greatest map you will ever see in the world',
            owner: 'Orson Jiang',
            publishedDate: null,
            tags: ['WorldMap', 'Puppies', "Animal", "Population"],
        },
        {
            id: 0,
            name: 'Map of Japan',
            owner: 'Rachel Cong',
            publishedDate: null,
            tags: ['Japan', 'Population', "Infographic", "Rachel", "Country"],
        },
        {
            id: 0,
            name: 'Map of Germany',
            owner: 'Katlyn Ye',
            publishedDate: new Date(),
            tags: [],
        },
        {
            id: 0,
            name: 'Map of France',
            owner: 'Katlyn Ye',
            publishedDate: null,
            tags: [],
        },
    ];

    return (
        <div className="my-6 mx-20">
            {modal ? <UploadMap /> : ""}
            <div className='flex justify-between items-center'>
                <div className="my-6 text-2xl font-semibold">
                    Your Library
                </div>
                <div className='flex gap-3 items-center'>
                    <button className='h-fit py-2.5 px-4 rounded-lg text-white text-sm bg-indigo-400 hover:bg-indigo-500' onClick={openModal}>
                        Create Map
                    </button>
                    <div className="relative">
                        <button
                            id="dropdown-button"
                            data-dropdown-toggle="dropdown"
                            className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none "
                            type="button"
                            onClick={() => {setMenu("sortBy")}}
                        >
                            Sort By
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
                        { menu == "sortBy" ?
                        <div
                            id="sort-by-dropdown"
                            ref={ref}
                            className="absolute right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 "
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 "
                                aria-labelledby="dropdown-button"
                            >
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                    >
                                        None
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Name
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Creation Date
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Likes
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                    >
                                        Dislikes
                                    </button>
                                </li>
                            </ul>
                        </div> : null}
                    </div>
                </div>
            </div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {exampleListOfMaps.map((mapInfo, index) => {
                    return <div className={`p-1 pt-1 rounded-md h-full drop-shadow-sm ${mapInfo.publishedDate == null ? "border-2 border-violet-200 bg-white" : "border-2 border-indigo-300 bg-indigo-300/[0.9]"}`}>
                        {mapInfo.publishedDate == null ? 
                            (<Link to={"/app/editmap"}>
                                <MapCard key={index} mapInfo={mapInfo} />
                            </Link> ) :
                            <Link to={"/app/map"}>
                                <MapCard key={index} mapInfo={mapInfo} />
                            </Link>
                        }
                    </div>
                })}
            </div>
        </div>
    );
};

export default Home;
