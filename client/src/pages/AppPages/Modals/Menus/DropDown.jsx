import { useDispatch, useSelector } from "react-redux";

import { setMenu } from "../../../../actions/menu";
import { InputTypes, MenuTypes } from "../../../../constants";
import { useState } from "react";

const DropDown = ({ list, handleItem }) => {
    const dispatch = useDispatch();

    const [item, setItem] = useState('');
    const { menu } = useSelector((state) => state.menu);

    const Menu = (
        <div className="absolute right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full">
            <ul className="overflow-y-auto max-h-48 py-2 text-sm text-gray-700">
                {list.map((item, index) => {
                    return (
                        <li key={index}>
                            <button
                                onClick={() => {
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
    );
        
    return (
		<div className="grow relative">
		<button
			className="flex justify-between w-full whitespace-nowrap items-center py-2 px-3 font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-500 focus:outline-none relative"
			onClick={() => {
				if (menu === InputTypes.DROP_DOWN) {
					dispatch(setMenu(MenuTypes.NONE));
				} else {
					dispatch(setMenu(MenuTypes.DROP_DOWN));
				}
			}}
		>
			<div>{item}</div>
			<i className="fa-solid fa-chevron-down" />
		</button>
		{menu == MenuTypes.DROP_DOWN ? Menu : ''}
	</div>
    );
};

export default DropDown;
