const Heat = () => {
	return (
		<div>
			                <button
                    className="px-1 hover:bg-violet-100"
                    onClick={() => {
                        openCurrentModal('ADD_LAYER');
                    }}
                    title="Add Heat"
                >
                    <i className="fa-solid fa-plus mr-1.5"></i>
                    Heat Map
                </button>
		</div>
	);
};

export default Heat;
