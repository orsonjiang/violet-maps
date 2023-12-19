import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChromePicker } from 'react-color';

import { setMenu } from '../../../actions/menu';
import { MenuTypes } from '../../../constants';

import Menu from './Menu';

const Color = ({ children, type, oldColor, handleColor, disabled }) => {
    const dispatch = useDispatch();

    const { menu } = useSelector((state) => state.menu);
    const [color, setColor] = useState(oldColor);

    const handleColorChange = (color) => {
        setColor(color.hex);
    };

    const handleColorChangeComplete = (color) => {
        handleColor(color.hex);
    };

    const Exp = (
        <Menu>
            <div className="absolute z-50 inset-0 my-9">
                <ChromePicker
                    color={color}
                    disableAlpha={true}
                    onChange={handleColorChange}
                    onChangeComplete={handleColorChangeComplete}
                />
            </div>
        </Menu>
    );

    return (
        <div className="flex relative">
            <button
                disabled={disabled}
                className={`px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-7`}
                onClick={() => {
                    if (menu === type) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(type));
                    }
                }}
                title={type === "SET_FILL" ? "Edit Region Color" : "Edit Border Color"}
            >
                {children}
            </button>
            {menu == type ? Exp : ''}
        </div>
    );
};

export default Color;
