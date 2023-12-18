const Region = () => {
	return (
		<div>
			                <div className="flex relative">
                    <button // NEW CODE - disable when there is no selected feature
                        onClick={clickRegionColor}
                        className={
                            selectedFeature
                                ? `px-1 hover:bg-violet-100`
                                : `bg-gray-200 text-gray-500 cursor-not-allowed px-1`
                        }
                        disabled={selectedFeature == null}
                    >
                        Region Color
                    </button>
                    {menu == 'regionColor' ? (
                        <div className="absolute left-[-5px] z-50 my-9">
                            <ChromePicker
                                color={c}
                                onChange={handleColorChange}
                                onChangeComplete={() =>
                                    sendUpdateToServer('color')
                                }
                            />
                        </div>
                    ) : null}{' '}
                    {/*NEW CODE*/}
                </div>
		</div>
	);
};

export default Region;
