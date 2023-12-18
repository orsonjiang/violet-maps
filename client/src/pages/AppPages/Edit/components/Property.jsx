import { useDispatch, useSelector } from 'react-redux';

import { MenuTypes } from '../../../../constants';
import DropDown from '../../Menus/DropDown';
import { setProperty } from '../../../../actions/map';

const Property = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);
    
    const handleSetProperty = (property) => {
        dispatch(setProperty(property));
    };

    return <DropDown type={MenuTypes.SET_PROPERTY} list={Object.keys(map.properties.data[0])} currentItem={map.graphics.label.property} handleItem={handleSetProperty}/>
};

export default Property;