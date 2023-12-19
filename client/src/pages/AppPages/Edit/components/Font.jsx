import { useDispatch, useSelector } from 'react-redux';

import { MenuTypes } from '../../../../constants';
import DropDown from '../../Menus/DropDown';
import { setFont } from '../../../../actions/map';

const Font = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);
    
    const handleSetFont = (font) => {
        dispatch(setFont(font));
    };

    const fontOptions = ["font-sans", "font-serif", "font-mono"];

    return <DropDown type={MenuTypes.SET_FONT} list={fontOptions} currentItem={map.graphics.label.fontStyle} handleItem={handleSetFont}/>
};

export default Font;
