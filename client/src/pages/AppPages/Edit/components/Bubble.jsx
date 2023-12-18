const Bubble = () => {
	return (
		<div>
			                <button
                    className="px-1 hover:bg-violet-100"
                    onClick={() => {
                        openCurrentModal('ADD_LAYER');
                    }}
                >
                    <i className="fa-solid fa-plus mr-1.5"></i>
                    Bubbles
                </button>
		</div>
	);
};

export default Bubble;
