import { useSelector } from "react-redux";

import { convert, handleExportMap } from "../../../../helpers";
import { MenuTypes } from '../../../../constants';
import DropDown from '../../Menus/DropDown';

const Download = () => {
    const { map, container } = useSelector((state) => state.map.present);

    const handleExport = (type) => {
        if (type === "JSON") {
            // const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
            //     ...map,
            //     customFileType: "violetmaps"
            // }));
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(convert(map)));
            const link = document.createElement('a');
            link.href = dataStr;
            link.download = `${map.name}.json`;
            link.click();
        } else {
            handleExportMap(document.getElementById("map"), map, type, true);
        }

    };

    const Icon = (<i className="fa-solid fa-download"></i>);

    const exportOptions = ["PNG", "JPEG", "JSON"];

    return <DropDown type={MenuTypes.EDIT_EXPORT} list={exportOptions} handleItem={handleExport} icon={Icon}/>
};

export default Download;
