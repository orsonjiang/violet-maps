import { useSelector } from "react-redux";

import { handleExportMap } from "../../../../helpers";


const Thumbnail = () => {
    const { map, container } = useSelector((state) => state.map.present);

    const handleSetThumbnail = () => {
        handleExportMap(container, map, "PNG", false);
    };

    return (
        <button className="px-1 disabled:opacity-20 disabled:bg-inherit hover:bg-gray-200 rounded-full w-7" onClick={() => handleSetThumbnail()} title="Set Thumbnail">
            <i className="fa-solid fa-image"></i>
        </button>
    );
};

export default Thumbnail;
