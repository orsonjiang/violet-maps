import { useDispatch, useSelector } from "react-redux";

import { toggleLabel } from "../../../../actions/map";

const Label = () => {
	const dispatch = useDispatch();

	const { map } = useSelector((state) => state.map.present);

    const classColor = map.graphics.label.showLabels ? 'text-green-500' : 'text-red-500';

    return (
        <button
            className={"px-1 hover:bg-gray-200 rounded-full w-7 " + classColor}
            onClick={() => dispatch(toggleLabel())}
        >
                <i className="fa-solid fa-tag"></i>
        </button>
    );
};

export default Label;
