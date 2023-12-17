const Font = () => {
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
