const Loading = ({ children }) => {
	return (
		<div className="grow flex justify-center align-middle">
			<div className="flex flex-col justify-center align-middle">
				{ children ? children : 'Loading'}
			</div>
		</div>
	);
};

export default Loading;
