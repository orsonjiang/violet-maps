import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import store from '../../store';
import auths from '../../api/auth';
import { setUser } from '../../actions/user';

const Navbar = () => {
    const navigate = useNavigate();

    const [menu, setMenu] = useState('none');

    const { user } = useSelector((state) => state.user);

    // useEffect(() => {
    //     if (user.email == "") {
    //         navigate('/');
    //     }
    // },[user.email])

    const handleLogout = async () => {
        const req = await auths.postLogout();
        if (req.status === 200) {
            store.dispatch(setUser(req.body));
            navigate('/');
        } else {
            console.log(req.error);
        }
    };

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

    const ref = useRef(null);
    closeMenus(ref);

    const setSearchBy = () => {};

    return (
        <nav className="bg-gradient-to-r from-violet-300 to-indigo-300 p-3">
            <div className="flex gap-4 items-center pl-2">
                <Link to={'/app/home'}>
                    <i className="fa fa-home text-xl text-white" />
                </Link>
                <i className="fas fa-globe-americas text-xl text-violet-100" />
                <div className="flex w-full">
                    <div className="relative">
                        <button
                            id="dropdown-button"
                            data-dropdown-toggle="dropdown"
                            className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none "
                            type="button"
                            onClick={() => {
                                setMenu('searchBy');
                            }}
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
                        {menu == 'searchBy' ? (
                            <div
                                id="search-by-dropdown"
                                ref={ref}
                                className="absolute my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
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
                                            Map Name
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                        >
                                            Map Properties
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                        >
                                            Username
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : null}
                    </div>
                    <div className="relative w-full">
                        <input
                            type="search"
                            id="search-dropdown"
                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300  "
                            placeholder="Search maps"
                            required=""
                        />
                        <button
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-indigo-500 rounded-e-lg border border-indigo-500 hover:bg-indigo-600 focus:outline-none "
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
                        onClick={() => {
                            setMenu('profile');
                        }}
                        className="flex gap-[1px] items-center justify-center h-10 w-10 shadow-none hover:shadow-none font-semibold bg-indigo-200 text-sm p-2 rounded-full shrink-0"
                    >
                        <p>{user.firstName.charAt(0)}</p>
                        <p>{user.lastName.charAt(0)}</p>
                    </button>
                    {/* Dropdown menu */}
                    {menu == 'profile' ? (
                        <div
                            ref={ref}
                            className="absolute right-0 z-50 my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow min-w-32"
                            id="user-dropdown"
                        >
                            {user._id === '' ? (
                                <div>
                                    <Link
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                        to={'/login'}
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg "
                                        to={'/register'}
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 ">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="block text-sm  text-gray-500 truncate ">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ul
                                        className="py-2"
                                        aria-labelledby="user-menu-button"
                                    >
                                        <li>
                                            <button
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                                onClick={handleLogout}
                                            >
                                                Log out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
