const SortBy = ({ menu, setMenu }) => {
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
                </div>
            ) : null}
        </div>
    );
};

export default SortBy;
