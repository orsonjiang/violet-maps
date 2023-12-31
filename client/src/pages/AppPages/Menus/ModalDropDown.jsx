import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMenu } from '../../../actions/menu';
import { MenuTypes } from '../../../constants';

import Menu from './Menu';

const ModalDropDown = ({ type, list, currentItem, handleItem }) => {
    const dispatch = useDispatch();

    const { menu } = useSelector((state) => state.menu);
    const [item, setItem] = useState(currentItem ? currentItem : '');

    useEffect(() => {
        if (!currentItem && list.length > 0 ) {
            setItem(list[0]);
            handleItem(list[0]);
        }
    }, [])

    const Exp = (
        <Menu>
            <div className="absolute right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow">
                <ul className="overflow-y-auto max-h-48 py-2 text-sm text-gray-700">
                    {list.map((item, index) => {
                        return (
                            <li key={index}>
                                <button
                                    onClick={(event) => {
                                        handleItem(item);
                                        setItem(item);
                                        dispatch(setMenu(MenuTypes.NONE));
                                    }}
                                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                >
                                    {item}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Menu>
    );

    return (
        <div className="relative">
            <button
                className="flex gap-2 justify-between whitespace-nowrap items-center py-2 px-3 font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-500 focus:outline-none relative"
                onClick={() => {
                    if (menu === type) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(type));
                    }
                }}
            >
                <div>{item}</div>
                <i className="fa-solid fa-chevron-down" />
            </button>
            {menu == type ? Exp : ''}
        </div>
    );
};

export default ModalDropDown;
