import { useState, useEffect, useRef } from "react";

const Navbar = () => {
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

    const setSearchBy = () => {};

    return (
        <nav className="bg-gradient-to-r from-violet-300 to-indigo-300 dark:bg-gray-900 p-3">
            <div className="flex gap-4 items-center pl-2">
                <i className="fa fa-home text-xl text-white" />
                <i className="fas fa-globe-americas text-xl text-violet-100" />
                <div className="flex w-full">
                    <div className="relative">
                        <button
                            id="dropdown-button"
                            data-dropdown-toggle="dropdown"
                            className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
                            type="button"
                            onClick={() => {setMenu("searchBy")}}
                        >
                            Map Name{' '}
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
                        { menu == "searchBy" ?
                        <div
                            id="search-by-dropdown"
                            ref={ref}
                            className="absolute my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdown-button"
                            >
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Map Name
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Map Properties
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Username
                                    </button>
                                </li>
                            </ul>
                        </div> : null}
                    </div>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Search maps"
                            required=""
                        />
                        <button
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-indigo-600 rounded-e-lg border border-indigo-600 hover:bg-indigo-700 focus:outline-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="relative">
                    <button 
                        onClick={() => {setMenu("profile")}}
                        className="shadow-none hover:shadow-none font-semibold bg-indigo-200 text-sm p-3 rounded-full shrink-0"
                    >
                        {'KF'}
                    </button>
                    {/* Dropdown menu */}
                    {menu == "profile" ?
                    <div
                        ref={ref}
                        className="absolute right-0 z-50 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                        id="user-dropdown"
                    >
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">
                                Kayla Fang
                            </span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                                kayla.fang@stonybrook.edu
                            </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>: null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
