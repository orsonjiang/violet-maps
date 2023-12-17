import { useDispatch, useSelector } from "react-redux";

import { toggleLabel } from "../../../../actions/map";

const Label = () => {
	const dispatch = useDispatch();

	const { map } = useSelector((state) => state.map.present);

    return (
        <button
            className="px-1 hover:bg-violet-100"
            onClick={() => dispatch(toggleLabel())}
        >
            {map.graphics.label.showLabels ? 'Hide Labels' : 'Show Labels'}
        </button>
    );
};

export default Label;
