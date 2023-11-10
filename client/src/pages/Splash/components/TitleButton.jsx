const TitleButton = ({title, buttonText}) => {
    return (<div className="flex flex-col my-4">
        <div className="text-2xl my-2">{title}</div>
        <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-xl px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 self-center">
			{buttonText}
        </button>
    </div>);
};

export default TitleButton;
