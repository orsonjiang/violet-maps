import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMaps } from '../../../actions/maps';

const SortBy = () => {
    // Kevin - new code
    const { maps } = useSelector((state)=> state.maps);
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [menu, setMenu] = useState('none');

    
    const handleClickSortBy = (s) => {
        handleSort(s, maps);
    }
    
    const closeMenus = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenu('none');
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    };
    closeMenus(ref);

    const handleSort = (sortBy, curr_maps) => {
    
        let maps_list = curr_maps;
        switch (sortBy) {
            case "none":
                // default order of maps is based on chronological order oldest at top and newest to bottom
                maps_list.sort((a,b) => (new Date (a.createdAt) - new Date (b.createdAt)));
                break;
            case "name":
                // numerical values take precendence over alphabetical values
                maps_list.sort((a,b) => (a.name.localeCompare(b.name, undefined, { sensitivity: 'base'})));
                break;
            
            case "date":
                maps_list.sort((a,b) => (new Date (a.createdAt) - new Date (b.createdAt)));
                break;
            
            case "likes":
                maps_list.sort((a,b) => a.social.likes < b.social.likes ? 1 : -1);
                break;

            case "dislikes":
                maps_list.sort((a,b) => a.social.dislikes < b.social.dislikes ? 1 : -1);
                break;

            default:
                console.log("error established from handlesort");
                break;
        };
        dispatch(setMaps(maps_list));
    };
    
    // TODO: Fix menu.
    return (
        <div className="relative">
            <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none "
                type="button"
                onClick={() => {
                    setMenu('sortBy');
                }}
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
            {menu == 'sortBy' ? (
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
                                onClick={() => handleClickSortBy("none")}
                            >
                                None
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => handleClickSortBy("name")}
                            >
                                Name
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => handleClickSortBy("date")}
                            >
                                Creation Date
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => handleClickSortBy("likes")}
                            >
                                Likes
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => handleClickSortBy("dislikes")}
                            >
                                Dislikes
                            </button>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default SortBy;
