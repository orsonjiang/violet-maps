import { Link } from 'react-router-dom';

const TitleButton = ({title, buttonText, link}) => {
    return (<div className="flex flex-col my-4">
        <div className="text-[17px] my-2 font-medium text-center">{title}</div>
        <Link to={link} className="w-60 text-white bg-violet-400/[0.9] hover:bg-violet-500/[0.9] focus:outline-none font-medium rounded-full text-md py-2 text-center mb-2 self-center">
            {buttonText}
        </Link>
    </div>);
};

export default TitleButton;
