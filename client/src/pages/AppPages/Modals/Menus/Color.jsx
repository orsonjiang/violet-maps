import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChromePicker } from "react-color";

import { setMenu } from "../../../../actions/menu";
import { MenuTypes } from "../../../../constants";
import { setColor } from "../../../../actions/newMap";

const Color = () => {
	const dispatch = useDispatch();

    const { menu } = useSelector((state) => state.menu);
    const [color, setColorState] = useState("#8187DC");

    const handleColorChange = (color) => {
        setColorState(color.hex);
    };

    const handleColorChangeComplete = (color) => {
        dispatch(setColor(color.hex));
    };

	const Menu = (
        <div className="absolute z-50 my-2">
            <ChromePicker
                color={color}
                disableAlpha={true}
                onChange={handleColorChange}
                onChangeComplete={handleColorChangeComplete}
            />
        </div>
    );
        
    return (
        <div className="grow relative">
            <button
                style={{ backgroundColor: `${color}` }}
                className={`flex justify-between w-full whitespace-nowrap items-center py-4 px-3 font-medium text-center text-white rounded-lg focus:outline-none relative`}
                onClick={() => {
                    if (menu === MenuTypes.COLOR) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(MenuTypes.COLOR));
                    }
                }}
            ></button>
            {menu == MenuTypes.COLOR ? Menu : ''}
        </div>
    );
};

export default Color;
