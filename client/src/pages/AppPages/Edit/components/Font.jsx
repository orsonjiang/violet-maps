const Font = () => {
	return (
        <div className="">
            <button
                className="flex gap-2 justify-between whitespace-nowrap items-center py-1 px-3 font-medium text-center bg-gray-300 rounded-lg hover:bg-violet-500 focus:outline-none relative"
                onClick={() => {
                    if (menu === type) {
                        dispatch(setMenu(MenuTypes.NONE));
                    } else {
                        dispatch(setMenu(type));
                    }
                }}
            >
                <div>{'adjaslkjdlksajls'}</div>
                <i className="fa-solid fa-chevron-down" />
            </button>
            {/* {menu == type ? Exp : ''} */}
        </div>
    );

	return (
		<div className="flex px-1 relative">
		<button
			onClick={() => {
				setMenu('fontStyle');
			}}
			className="flex gap-2 items-center"
		>
			{currentMap.graphics.fontStyle}
			<i className="fa-solid fa-chevron-down text-xs"></i>
		</button>
		{/* Dropdown menu */}
		{menu == 'fontStyle' ? fontStyleMenu : null}
	</div>
	);
};

export default Font;
