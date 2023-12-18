import { useDispatch, useSelector } from "react-redux";
import { setFontSize } from "../../../../actions/map";

const FontSize = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const fontSize = map.graphics.label.fontSize;

    return [
        <button key={'dec'} className="px-1 disabled:opacity-20 hover:bg-gray-200 rounded-full w-6" onClick={() => dispatch(setFontSize(fontSize-1))}>
            <i className="fa-solid fa-minus"></i>
        </button>,
        <div key={'size'} className="flex flex-col justify-center">{map.graphics.label.fontSize}</div>,
        <button key={'inc'} className="px-1 disabled:opacity-20 hover:bg-gray-200 rounded-full w-6" onClick={() => dispatch(setFontSize(fontSize+1))}>
            <i className="fa-solid fa-plus"></i>
        </button>,
    ];
};

export default FontSize;
