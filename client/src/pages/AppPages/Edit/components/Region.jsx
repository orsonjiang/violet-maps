import { useDispatch, useSelector } from 'react-redux';

import { MenuTypes } from '../../../../constants';
import { setFill } from '../../../../actions/map';

import Color from '../../Menus/Color';

const Region = () => {
    const dispatch = useDispatch();

    const { map, region } = useSelector((state) => state.map.present);
    const index = region ? region.feature.properties.index : 0;

    return [
        <Color key={'edit-fill'} disabled={!region} type={MenuTypes.SET_FILL} color={map.graphics.style[index].fill} handleColor={(color) => dispatch(setFill(color))}>
            <i className="fa-solid fa-fill-drip"></i>
        </Color>
    ];
};

export default Region;