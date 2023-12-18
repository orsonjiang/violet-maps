import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color"
import Modal from "../../../components/Modals/Modal";
import Legend from "../../../components/Modals/Legend";
import AddLayer from "../../../components/Modals/AddLayer";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../../actions/modal";
import apis from "../../../../api/api";
import { updateMapInStore, updateSelectedFeature } from "../../../../actions/map";

const Toolbar = ({ exportMap }) => {
    const [menu, setMenu] = useState("none");
    const updates = useRef(null);
    const [dataPropList, setDataPropList] = useState([]);
    const [c, setC] = useState(""); // NEW CODE: color

    const currentModal = useSelector((state) => state.modal.currentModal);
    const {currentMap, selectedFeature}  = useSelector((state) => state.map); // NEW CODE

    const dispatch = useDispatch();


    useEffect(() => {
        if (!updates.current) {
            updates.current = { ...currentMap };
            delete updates.current["data"];
        }
    }, []);

    useEffect(() => { // NEW CODE: every time map is updated, we grab the most up to date data properties
        // get the data properties
        const list = []; // list of data props for user to choose
        if (currentMap.features.length > 0) { // does it have at least one feature?
            const props = currentMap.features[0]["properties"];

            for (const [key, value] of Object.entries(props)) {
                if (typeof value == "number" || typeof value == "string") {
                    list.push(key);
                }
            }
        }
        setDataPropList(list);
   
    }, [currentMap]);

    const openCurrentModal = (type) => {
        dispatch(openModal(type))
    }

    const selectModal = () => {
        if (currentModal == "TEXT_MODAL") {
            return (
                <Modal title={"Add/Edit Label for Region"} description={`Adding value to data property: ${currentMap.graphics.dataProperty}`} inputText={"Enter Value"} containsInput={true} /> // NEW CODE
            )
        }
        else if (currentModal == "ADD_DATA_PROP_MODAL") {
            return (
                <Modal title={"Add New Data Property"} description={"Enter a name for your property"} inputText={"Enter Name"} containsInput={true} />
            )
        }
        else if (currentModal == "DELETE_MAP") {
            return (
                <Modal title={"Delete Map?"} description={"Please confirm that you want to delete the map."} containsInput={false} />
            )
        }
        else if (currentModal == "PUBLISH_MODAL") {
            return (<Modal title={"Publish Map?"} description={"Please confirm that you want to publish this map."} containsInput={false} />);
        }
        else if (currentModal == "LEGEND_MODAL") {
            return (<Legend />)
        }
        else if (currentModal == "ADD_LAYER") {
            return (<AddLayer view={"edit"} containsInput={false} />)
        }
    }

    const closeMenus = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenu("none");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref])
    }

    const ref = useRef(null);
    closeMenus(ref);

    // NEW CODE
    const clickRegionColor = () => {
        const idx = selectedFeature.featureRef.feature.properties.index;
        setMenu("regionColor"); // open color picker
        setC(currentMap.features[idx].style.fill); // get initial color to display in color picker
    }

    // NEW CODE
    const clickBorderColor = () => {
        const idx = selectedFeature.featureRef.feature.properties.index;
        setMenu("borderColor"); // open color picker
        setC(currentMap.features[idx].style.border); // get initial color to display in color picker
    }

    // NEW CODE - update color of selected feature as user is dragging in the color picker
    const handleColorChange = (color) => {
        const idx = selectedFeature.featureRef.feature.properties.index;
        if (menu == "borderColor") {
            selectedFeature.featureRef.setStyle({color: color.hex}) // update in leaflet
            updates.current.features[idx].style.border = color.hex; // update in copy of current map - not updating store directly
            setC(color.hex); // so that the circle in the color picker moves
        } else if (menu == "regionColor") {
            selectedFeature.featureRef.setStyle({fillColor: color.hex}) // update in leaflet
            updates.current.features[idx].style.fill = color.hex; // update in copy of current map - not updating store directly
            setC(color.hex); // so that the circle in the color picker moves
        }
    }

    // NEW CODE - generalized function to send updates to server
    const sendUpdateToServer = (type, update=null) => {
        switch(type) {
            case "showLabels":
                updates.current.graphics.showLabels = !updates.current.graphics.showLabels;
                break;
            case "changeDataProp":
                updates.current.graphics.dataProperty = update;
                break;
            case "changeFontStyle":
                updates.current.graphics.fontStyle = update;
                break;
            case "incFontSize":
                if (updates.current.graphics.fontSize < 25) { // font size can't go above 25
                    updates.current.graphics.fontSize++;
                }
                break;
            case "decFontSize":
                if (updates.current.graphics.fontSize > 5) { // font size can't go below 5
                    updates.current.graphics.fontSize--;
                }
                break;
            case "changeLabelPosition":
                updates.current.graphics.labelPosition = update;
                break;
            case "color":
                break;
        }

        apis.updateMap(currentMap._id, updates.current).then((res) => {
            dispatch(updateMapInStore(updates.current))
        }).catch((err) => {
            console.log(err);
        })

        // printMap("PNG", false);
    }

    const border = (
        <div className="w-0.5 h-6 bg-gray-100 mx-1"></div>
    );

    // NEW CODE - changed font options
    const fontOptions = ["font-sans", "font-serif", "font-mono"]
    const fontStyleMenu = (
        <div
            ref={ref}
            className="absolute overflow-y-auto max-h-44 w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                {fontOptions.map((font, key) => {
                    return (
                        <li key={key}>
                            <button
                                className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                                onClick={() => sendUpdateToServer("changeFontStyle", font)}
                            >
                                {font}
                            </button>
                        </li>
                    )
                })}
                
            </ul>
        </div>
    )

    // NEW CODE
    const labelPositionOptions = ["center", "right", "left", "top", "bottom", "auto"];
    const labelPositionMenu = (
        <div
            ref={ref}
            className="absolute overflow-y-auto max-h-44 w-36 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                {labelPositionOptions.map((position, key) => {
                    return (
                        <li key={key}>
                            <button
                                className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => sendUpdateToServer("changeLabelPosition", position)}
                            >
                                {position}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

    const dataPropertyMenu = (
        <div
            ref={ref}
            className="absolute w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] overflow-y-auto max-h-[136px] py-2" aria-labelledby="user-menu-button">
                {dataPropList.map((item, key) => {
                    return (
                        <li key={key}>
                            <button
                                className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                                onClick={() => sendUpdateToServer("changeDataProp", item)}
                            >
                                {item}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="px-4 py-3 hover:bg-gray-100 rounded-lg ">
                <button className="block text-violet-500 text-xs  " onClick={() => openCurrentModal("ADD_DATA_PROP_MODAL")}>
                    + New Data Property
                </button>
            </div>
        </div>
    )


    const printMap = (type, download) => {
        exportMap(type, download);
    }

    const exportMenu = (
        <div
            ref={ref}
            className="absolute w-28 left-[-44px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 " onClick={() => printMap("PNG", true)}
                    >
                        PNG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 " onClick={() => printMap("JPG", true)}
                    >
                        JPG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        JSON
                    </button>
                </li>
            </ul>
        </div>
    )

    return (
        <div className="absolute z-[4000] w-full">
            {currentModal ? selectModal() : ""}
            <div className="flex flex-wrap bg-white p-2 px-4 mx-5 my-2 justify-between rounded-lg border-[1px] border-violet-200 drop-shadow-sm">
                <button className="px-1">
                    <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button className="px-1">
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
                {border}
                <button
                    className="px-1 hover:bg-violet-100"
                    onClick={() => sendUpdateToServer("showLabels")}
                >
                    {currentMap.graphics.showLabels ? "Hide Labels" : "Show Labels"}
                </button>
                {border}
                <div className="flex px-1 relative">
                    <button
                        onClick={() => { setMenu("fontStyle") }}
                        className="flex gap-2 items-center"
                    >
                        {currentMap.graphics.fontStyle}
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {/* Dropdown menu */}
                    {menu == "fontStyle" ? fontStyleMenu : null}
                </div>
                {border}
                <button 
                    className="px-1" 
                    onClick={() => sendUpdateToServer("decFontSize")}> {/*NEW CODE*/}
                    <i className="fa-solid fa-minus"></i>
                </button>
                <input
                    type="text"
                    value={currentMap.graphics.fontSize}
                    maxLength={2}
                    className="w-6 text-center"
                />
                <button 
                    className="px-1"
                    onClick={() => sendUpdateToServer("incFontSize")}> {/*NEW CODE*/}
                    <i className="fa-solid fa-plus"></i>
                </button>
                {border}
                <div className="flex px-1 relative">
                    <button
                        onClick={() => { setMenu("labelPosition") }}
                        className="flex gap-2 items-center"
                    >
                        {currentMap.graphics.labelPosition}
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {menu == "labelPosition" ? labelPositionMenu : null}
                </div>
                {border}
                <button // NEW CODE - disable when there is no selected feature
                    className={selectedFeature ? `px-1 hover:bg-violet-100` : `bg-gray-200 text-gray-500 cursor-not-allowed px-1`}
                    disabled={selectedFeature ==  null} 
                    onClick={() => { openCurrentModal("TEXT_MODAL") }}>
                        Add Text
                </button>
                {border}
                <div className="flex relative">
                    <button // NEW CODE - disable when there is no selected feature
                        onClick={clickRegionColor}
                        className={selectedFeature ? `px-1 hover:bg-violet-100` : `bg-gray-200 text-gray-500 cursor-not-allowed px-1`}
                        disabled={selectedFeature ==  null}
                    >
                        Region Color
                    </button>
                    {menu == "regionColor" ? 
                        <div ref={ref} className="absolute left-[-5px] z-50 my-9">
                            <ChromePicker color={c} onChange={handleColorChange} onChangeComplete={ () => sendUpdateToServer("color") }/>
                        </div> : null} {/*NEW CODE*/}
                </div>
                {border}
                <div className="flex relative">
                    <button // NEW CODE - disable when there is no selected feature
                        onClick={clickBorderColor}
                        className={selectedFeature ? `px-1 hover:bg-violet-100` : `bg-gray-200 text-gray-500 cursor-not-allowed px-1`}
                        disabled={selectedFeature ==  null}
                    >
                        Border Color
                    </button>
                    {menu == "borderColor" ? 
                        <div ref={ref} className="absolute left-[-5px] z-50 my-9">
                            <ChromePicker color={c} onChange={handleColorChange} onChangeComplete={ () => sendUpdateToServer("color")  }/>
                        </div> : null} {/*NEW CODE*/}
                </div>
                {border}
                <button className="px-1 hover:bg-violet-100" onClick={() => { openCurrentModal("LEGEND_MODAL") }}>Legend</button>
                {border}
                <div className="flex px-1 relative">
                    <button
                        onClick={() => { setMenu("dataProperty") }}
                        className="flex gap-2 items-center"
                    >
                        {currentMap.graphics.dataProperty}
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>
                    {menu == "dataProperty" ? dataPropertyMenu : null}
                </div>
                {border}
                <button className="px-1 hover:bg-violet-100" onClick={() => { openCurrentModal("ADD_LAYER") }}>
                    <i className="fa-solid fa-plus mr-1.5"></i>
                    Bubbles
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100" onClick={() => { openCurrentModal("ADD_LAYER") }}>
                    <i className="fa-solid fa-plus mr-1.5"></i>
                    Heat Map
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100" onClick={() => { openCurrentModal("PUBLISH_MODAL") }}>Publish</button>
                {border}
                <div className="flex px-1 relative">
                    <button
                        onClick={() => { setMenu("export") }}
                        className="flex gap-2 items-center"
                    >
                        <i className="fa-solid fa-download"></i>
                    </button>
                    {menu == "export" ? exportMenu : null}
                </div>
                <button className="px-1" onClick={() => { openCurrentModal("DELETE_MAP") }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default Toolbar;