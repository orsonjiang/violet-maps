const TitleButton = ({title, buttonText}) => {
    return (<div className="flex flex-col my-4">
        <div className="text-xl my-2 font-semibold text-center">{title}</div>
        <button className="text-white bg-[#B998EE] hover:bg-[#9479BE] focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium rounded-full text-md  py-2 text-center mb-2 dark:bg-[#B998EE]dark:hover:bg-purple-700 dark:focus:ring-[#9479BE] self-center w-60">
			{buttonText}
        </button>
    </div>);
};

export default TitleButton;
