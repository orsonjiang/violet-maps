import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { setSortBy } from '../../../actions/collate'
import { setMenu } from '../../../actions/menu';
import { MenuTypes } from '../../../constants';
import { SortByTypes } from "../../../constants"; 

import Menu from '../Menus/Menu';

const SortBy = ({ currentItem }) => {
	const type = MenuTypes.SORT_BY;
	const list = Object.values(SortByTypes);
	
    const dispatch = useDispatch();

    const { menu } = useSelector((state) => state.menu);
    const { sortBy } = useSelector((state) => state.collate);

    const [item, setItem] = useState();

    const Exp = (
        <Menu>
            <div className="absolute right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40">
                <ul className="overflow-y-auto py-2 text-sm text-gray-700">
                    {list.map((item, index) => {
                        const selectedClass = item === sortBy ? ' bg-gray-200' : '';
                        return (
                            <li key={index}>
                                <button
                                    onClick={(event) => {
										dispatch(setSortBy(item))
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

	return (
        <div className="relative">
            <button
			className="gap-2 whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none "
                onClick={() => {
                    if (menu === type) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(type));
                    }
                }}
            >
                Sort By
                <i className="fa-solid fa-chevron-down" />
            </button>
            {menu == type ? Exp : ''}
        </div>
    );
};

export default SortBy;
