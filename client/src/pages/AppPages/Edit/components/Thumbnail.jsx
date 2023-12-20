import { useDispatch, useSelector } from "react-redux";

import { handleExportMap } from "../../../../helpers";
import { setModal } from "../../../../actions/modal";
import { ModalTypes } from "../../../../constants";
import { setThumbnail } from "../../../../actions/map";


const Thumbnail = () => {
    const dispatch = useDispatch();

    const { map } = useSelector((state) => state.map.present);

    const handleSetThumbnail = () => {
        dispatch(setThumbnail(false))
        dispatch(setModal(ModalTypes.SET_THUMBNAIL))
        handleExportMap(document.getElementById("map"), map, "PNG", false, dispatch);
    };

    return (
        <button className="px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-7" onClick={() => handleSetThumbnail()} title="Set Thumbnail">
            <i className="fa-solid fa-image"></i>
        </button>
    );
};

export default Thumbnail;
