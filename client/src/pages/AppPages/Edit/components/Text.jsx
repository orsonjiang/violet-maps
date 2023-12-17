const Text = () => {
	return (
		<div>
			                <button // NEW CODE - disable when there is no selected feature
                    className={
                        selectedFeature
                            ? `px-1 hover:bg-violet-100`
                            : `bg-gray-200 text-gray-500 cursor-not-allowed px-1`
                    }
                    disabled={selectedFeature == null}
                    onClick={() => {
                        openCurrentModal('TEXT_MODAL');
                    }}
                >
                    Add Text
                </button>
		</div>
	);
};

export default Text;
