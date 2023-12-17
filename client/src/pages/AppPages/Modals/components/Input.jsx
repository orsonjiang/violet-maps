import { useState } from 'react';
import { ChromePicker } from 'react-color';

import { InputTypes } from '../../../../constants';

const Input = ({ type, title, onChange, onClick, placeholder, list }) => {
    const [menu, setMenu] = useState(InputTypes.NONE);
    const [item, setItem] = useState('');
    const [color, setColor] = useState("#8187DC");

    const handleColorChange = (color) => {
        setColor(color.hex);
    };

    const DropDownMenu = (
        <div className="absolute right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
            <ul className="overflow-y-auto max-h-48 py-2 text-sm text-gray-700">
                {list?.map((item, index) => {
                    return (
                        <li key={index}>
                            <button
                                onClick={() => {
                                    setItem(item);
                                    setMenu(false);
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
    );

    const ColorMenu = (
        <div className="absolute z-50 my-2">
            <ChromePicker
                color={color}
                disableAlpha={true}
                onChange={handleColorChange}
            />
        </div>
    );

    const renderInput = {
        [InputTypes.TEXT]: (
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="rounded-lg p-1.5 px-3 bg-white w-full"
            />
        ),
        [InputTypes.DROP_DOWN]: (
            <div className="grow relative">
                <button
                    className="flex justify-between w-full whitespace-nowrap items-center py-2.5 px-3 font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-500 focus:outline-none relative"
                    onClick={() => {
                        if (menu === InputTypes.DROP_DOWN) {
                            setMenu(InputTypes.NONE);
                        } else {
                            setMenu(InputTypes.DROP_DOWN);
                        }
                    }}
                >
                    <div>{item}</div>
                    <i className="fa-solid fa-chevron-down" />
                </button>
                {menu == InputTypes.DROP_DOWN ? DropDownMenu : ''}
            </div>
        ),
        [InputTypes.COLOR]: (
            <div className="grow relative">
                <button
                    style={{backgroundColor: `${color}`}}
                    className={`flex justify-between w-full whitespace-nowrap items-center py-4 px-3 font-medium text-center text-white rounded-lg focus:outline-none relative`}
                    onClick={() => {
                        if (menu === InputTypes.COLOR) {
                            setMenu(InputTypes.NONE);
                        } else {
                            setMenu(InputTypes.COLOR);
                        }
                    }}
                ></button>
                {menu == InputTypes.COLOR ? ColorMenu : ''}
            </div>
        ),
    };

    return (
        <div>
            <div className="text-sm flex justify-between gap-3 items-center">
                {title}
                {renderInput[type]}
            </div>
        </div>
    );
};

export default Input;
