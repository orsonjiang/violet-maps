import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import auths from '../../../api/auth';
import { setUser } from '../../../actions/user';

import SearchBar from './SearchBar';
import ToolbarWrapper from '../Edit/components/Toolbar';
import { setMaps } from '../../../actions/maps';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef(null);

    const { view } = useParams();
    const { user } = useSelector((state) => state.user);

    const [menu, setMenu] = useState('none');

    const handleLogout = async () => {
        const req = await auths.postLogout();
        if (req.status === 200) {
            dispatch(setUser(req.data));
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
    closeMenus(ref);

    const renderView = {
        'home': <SearchBar/>,
        'explore': <SearchBar/>,
        'map': <div className='grow'>{' '}</div>,
        'edit': <ToolbarWrapper/>,
    };

    const colorSelectedView = (page) => view === page ? "text-white" : "text-violet-100";

    return (
        <nav className="bg-gradient-to-r from-violet-300 to-indigo-300 p-3">
            <div className="flex gap-4 items-center pl-2">
                <Link to={"/app/home"}>
                    <button onClick={() => dispatch(setMaps(null))}>
                        <i id="home-icon" className={`fa fa-home text-xl ${colorSelectedView("home")}`} />
                    </button>
                </Link>
                <Link to={"/app/explore"}>
                    <button onClick={() => dispatch(setMaps(null))}>
                        <i id='explore-icon' className={`fas fa-globe-americas text-xl ${colorSelectedView("explore")}`} />
                    </button>
                </Link>
                
                {renderView[view]}
                
                <div className={"relative z-[550]"}>
                    <button
                        onClick={() => {
                            setMenu('profile');
                        }}
                        id="userAvatar"
                        className="flex gap-[1px] items-center justify-center h-10 w-10 shadow-none hover:shadow-none font-semibold bg-indigo-200 text-sm p-2 rounded-full shrink-0"
                    >
                        <p>{user.firstName.charAt(0)}</p>
                        <p>{user.lastName.charAt(0)}</p>
                    </button>
                    {/* Dropdown menu */}
                    {menu == 'profile' ? (
                        <div
                            ref={ref}
                            className={`absolute ${view == "NONE" ? "top-[-10px] right-12" : "right-0"} my-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow min-w-32`}
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
