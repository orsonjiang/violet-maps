const Position = () => {
	return (
		<div className="flex px-1 relative">
		<button
			onClick={() => {
				setMenu('labelPosition');
			}}
			className="flex gap-2 items-center"
		>
			{currentMap.graphics.labelPosition}
			<i className="fa-solid fa-chevron-down text-xs"></i>
		</button>
		{menu == 'labelPosition' ? labelPositionMenu : null}
	</div>
	);
};

export default Position;
