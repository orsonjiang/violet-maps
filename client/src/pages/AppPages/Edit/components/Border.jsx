import { useDispatch, useSelector } from 'react-redux';

import { MenuTypes } from '../../../../constants';
import { setBorder } from '../../../../actions/map';

import Color from '../../Menus/Color';

const Border = () => {
    const dispatch = useDispatch();

    const { map, region } = useSelector((state) => state.map.present);
    const index = region ? region.feature.properties.index : 0;

    return [
        <Color key={'edit-fill'} disabled={!region} type={MenuTypes.SET_BORDER} color={map.graphics.style[index].border} handleColor={(color) => dispatch(setBorder(color))}>
            <i className="fa-solid fa-border-top-left"></i>
        </Color>
    ];
};

export default Border;