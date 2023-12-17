const FontSize = () => {
	return (
		<div>
		                <button
                    className="px-1"
                    onClick={() => sendUpdateToServer('decFontSize')}
                >
                    {' '}
                    {/*NEW CODE*/}
                    <i className="fa-solid fa-minus"></i>
                </button>
                <input
                    type="text"
                    value={currentMap.graphics.fontSize}
                    maxLength={2}
                    className="w-6 text-center"
                />
                <button
                    className="px-1"
                    onClick={() => sendUpdateToServer('incFontSize')}
                >
                    {' '}
                    {/*NEW CODE*/}
                    <i className="fa-solid fa-plus"></i>
                </button>
		</div>
	);
};

export default FontSize;
