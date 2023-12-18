const Property = () => {
	return (
		<div>
			                <div className="flex px-1 relative">
                    <button
                        onClick={() => {
                            setMenu('dataProperty');
                        }}
                        className="flex gap-2 items-center"
                    >
                        {currentMap.graphics.dataProperty}
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {menu == 'dataProperty' ? dataPropertyMenu : null}
                </div>
		</div>
	);
};

export default Property;
