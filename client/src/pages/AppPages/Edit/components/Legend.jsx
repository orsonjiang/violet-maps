const Legend = () => {
	return (
		<div>
			                <button
                    className="px-1 hover:bg-violet-100"
                    onClick={() => {
                        openCurrentModal('LEGEND_MODAL');
                    }}
                >
                    Legend
                </button>
		</div>
	);
};

export default Legend;
