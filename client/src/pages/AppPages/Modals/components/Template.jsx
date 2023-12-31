import { useDispatch, useSelector } from "react-redux";

import { setTemplate } from "../../../../actions/newMap";

const Template = ({type, image, children}) => {
	const dispatch = useDispatch();

    const { template } = useSelector((state) => state.newMap);

	const chooseTemplate = (t) => {
        // TODO: Add enums.
        dispatch(setTemplate(t));
    }

	const selected = "text-left p-2 pt-2 rounded-md bg-indigo-200 h-full border-[1px] border-[#B998EE] drop-shadow-lg";
    const unselected = "text-left p-2 pt-2 rounded-md bg-white h-full border-[1px] border-[#B998EE] drop-shadow-lg";

    return (
        <button
            onClick={() => chooseTemplate(type)}
            className={`${template == type ? selected : unselected}`}
        >
            <img
                src={image}
                alt="map-image"
                className="border-[1px] border-[#B998EE]"
            />
            <div className="text-sm font-semibold mt-2">{children}</div>
        </button>
    );
};

export default Template;
