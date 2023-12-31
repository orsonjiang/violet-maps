import { useDispatch, useSelector } from "react-redux";

import { setFontSize } from "../../../../actions/map";

const FontSize = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const fontSize = map.graphics.label.fontSize;
    
    const handleSetFontSize = (fontSize) => {
        if (fontSize < 5 || fontSize > 25) return;
        dispatch(setFontSize(fontSize))
    };

    const className = map.graphics.label.isDisplayed ? " " : " opacity-20";

    return [
        <button key={'dec'} disabled={fontSize === 5 || !map.graphics.label.isDisplayed} className="px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-7" onClick={() => handleSetFontSize(fontSize-1)} >
            <i className="fa-solid fa-minus"></i>
        </button>,
        <div key={'size'} className={"flex flex-col justify-center" + className} >{map.graphics.label.fontSize}</div>,
        <button key={'inc'} disabled={fontSize === 25 || !map.graphics.label.isDisplayed} className="px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-7" onClick={() => handleSetFontSize(fontSize+1)}>
            <i className="fa-solid fa-plus"></i>
        </button>,
    ];
};

export default FontSize;
