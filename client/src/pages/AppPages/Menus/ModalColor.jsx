import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChromePicker } from "react-color";

import { setMenu } from "../../../actions/menu";
import { MenuTypes } from "../../../constants";

import Menu from './Menu';

const ModalColor = ({ type, handleSetColor, defaultColor }) => {
	const dispatch = useDispatch();

    const { menu } = useSelector((state) => state.menu);
    const [color, setColorState] = useState(defaultColor);

    const handleColorChange = (color) => {
        setColorState(color.hex);
    };

	const Exp = (
        <Menu>
        <div className="absolute z-50 my-2">
            <ChromePicker
                color={color}
                disableAlpha={true}
                onChange={handleColorChange}
                onChangeComplete={(color) => handleSetColor(color.hex)}
            />
        </div>
        </Menu>
    );
        
    return (
        <div className="relative">
            <button
                style={{ backgroundColor: `${color}` }}
                className={`flex justify-between w-8 h-8 whitespace-nowrap items-center py-4 px-3 font-medium text-center text-white rounded-lg focus:outline-none relative`}
                onClick={() => {
                    if (menu === type) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(type));
                    }
                }}
            ></button>
            {menu == type ? Exp : ''}
        </div>
    );
};

export default ModalColor;
