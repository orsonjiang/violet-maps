import { useDispatch, useSelector } from 'react-redux';
import { MenuTypes } from '../../../../constants';
import DropDown from '../../Menus/DropDown';
import { setPosition } from '../../../../actions/map';

const Position = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);
    
    const handleSetPosition = (font) => {
        dispatch(setPosition(font));
    };

    const posOptions = ['center', 'right', 'left', 'top', 'bottom', 'auto'];

    return <DropDown type={MenuTypes.SET_POSITION} list={posOptions} currentItem={map.graphics.label.position} handleItem={handleSetPosition}/>
};

export default Position;
