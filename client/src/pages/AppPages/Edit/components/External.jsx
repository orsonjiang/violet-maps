const External = () => {
	return (
		<div>
			                <button
                    className="px-1 hover:bg-violet-100"
                    onClick={() => {
                        openCurrentModal('PUBLISH_MODAL');
                    }}
                >
                    Publish
                </button>
                <div className="flex px-1 relative">
                    <button
                        onClick={() => {
                            setMenu('export');
                        }}
                        className="flex gap-2 items-center"
                    >
                        <i className="fa-solid fa-download"></i>
                    </button>
                    {menu == 'export' ? exportMenu : null}
                </div>
                <button
                    className="px-1"
                    onClick={() => {
                        openCurrentModal('DELETE_MAP');
                    }}
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
		</div>
	);
};

export default External;
