import { Link } from 'react-router-dom';

const TitleButton = ({title, buttonText, link}) => {
    return (<div className="flex flex-col my-4">
        <div className="text-lg my-2 font-medium text-center">{title}</div>
        <Link to={link} className="text-white bg-violet-400/[0.9] hover:bg-violet-500/[0.9] focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium rounded-full text-md py-2 text-center mb-2 dark:bg-[#B998EE]dark:hover:bg-purple-700 dark:focus:ring-[#9479BE] self-center w-60">
			{buttonText}
        </Link>
    </div>);
};

export default TitleButton;
