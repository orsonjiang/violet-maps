import { useDispatch, useSelector } from 'react-redux';

import { capitalize } from '../../../../helpers';
import { setTemplateLayer, removeTemplateLayer, addTemplateLayer } from '../../../../actions/map';
import { TemplateTypes } from '../../../../constants';

const Heat = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleClick = () => {
        if (map.graphics.heat) {
            dispatch(removeTemplateLayer(TemplateTypes.HEAT.toLowerCase())); // delete it
        } else {
            dispatch(setTemplateLayer(capitalize(TemplateTypes.HEAT)));
            dispatch(addTemplateLayer(""));
        }
        
    }

	return (
        <button
            className="whitespace-nowrap flex items-center px-2 hover:bg-gray-200 rounded-full"
            onClick={handleClick}
        >
            {map.graphics.heat ? <i className="fa-solid fa-minus mr-1.5"></i> : <i className="fa-solid fa-plus mr-1.5"></i>}
            <i className="bg-gradient-to-b from-red-500 to-purple-500 text-transparent bg-clip-text fa-solid fa-fire"></i>
        </button>
	);
};

export default Heat;