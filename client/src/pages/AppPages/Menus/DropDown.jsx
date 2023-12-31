import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { setMenu } from '../../../actions/menu';
import { MenuTypes } from '../../../constants';

import Menu from './Menu';
import Button from '../Map/components/Button';

const DropDown = ({ type, list, currentItem, handleItem, icon, button, disabled }) => {
    const dispatch = useDispatch();

    const { menu } = useSelector((state) => state.menu);
    const [item, setItem] = useState(currentItem);

    const Exp = (
        <Menu>
            <div className="absolute left-0 my-2 bg-white divide-y divide-gray-100 rounded-lg shadow">
                <ul className="overflow-y-auto max-h-40 py-2 text-sm text-gray-700">
                    {list.map((item, index) => {
                        const selectedClass = item === currentItem ? ' bg-gray-200' : '';

                        return (
                            <li key={index}>
                                <button
                                    onClick={(event) => {
                                        handleItem(item);
                                        setItem(item);
                                        dispatch(setMenu(MenuTypes.NONE));
                                    }}
                                    className={"inline-flex w-full px-4 py-2 hover:bg-gray-300" + selectedClass}
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

    if (button) {
        return (
            <div className="relative">
                <Button handler={() => {
                        if (menu === type) {
                            dispatch(setMenu(MenuTypes.NONE));
                        } else {
                            dispatch(setMenu(type));
                        }
                    }} icon = {button[1]} text={button[0]}/>
                {menu == type ? Exp : ''}
            </div>
        );
    }

    if (icon) {
        return (
            <div className="relative">
                <button
                    className="flex items-center py-1 px-2 hover:bg-gray-200 rounded-full"
                    onClick={() => {
                        if (menu === type) {
                            dispatch(setMenu(MenuTypes.NONE));
                        } else {
                            dispatch(setMenu(type));
                        }
                    }}
                >
                    <div className='grow'>{icon}</div>
                </button>
                {menu == type ? Exp : ''}
            </div>
        );
    }

	return (
        <div className="relative">
            <button
                className="flex gap-2 justify-between whitespace-nowrap items-center py-1 px-3 font-medium text-center bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none relative text-ellipsis disabled:opacity-20"
                onClick={() => {
                    if (menu === type) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(type));
                    }
                }}
                disabled={disabled}
            >
                <div className='grow'>{item}</div>
                <i className="fa-solid fa-chevron-down" />
            </button>
            {menu == type ? Exp : ''}
        </div>
    );
};

export default DropDown;
