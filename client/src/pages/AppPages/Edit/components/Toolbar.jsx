import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color"
import Modal from "../../components/Modals/Modal";
import Legend from "../../components/Modals/Legend";
import AddLayer from "../../components/Modals/AddLayer";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../../../actions/modal";
import apis from "../../../../api/api";
import { updateMapInStore } from "../../../../actions/map";

const Toolbar = () => {
    const [menu, setMenu] = useState("none");
    const updates = useRef(null);
    const [dataPropList, setDataPropList] = useState([]);

    const currentModal = useSelector((state) => state.modal.currentModal);
    const currentMap = useSelector((state) => state.map.currentMap);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!updates.current) {
            updates.current = { ...currentMap };
            delete updates.current["data"];
        }
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
    }, [])

    useEffect(() => {
        if (!updates.current) {
            updates.current = {...currentMap};
            delete updates.current["data"];
        }
        // get the data properties
        const list = []; // list of data props for user to choose
        console.log(currentMap);
        if (currentMap.features.length > 0) { // does it have at least one feature?
            const props = currentMap.features[0]["properties"];
            
            for (const [key, value] of Object.entries(props)) {
                if (typeof value == "number" || typeof value == "string") {
                    list.push(key);
                }
            }
        }
        setDataPropList(list);
    }, [])

    const openCurrentModal = (type) => {
        dispatch(openModal(type))
    }

    const selectModal = () => {
        if (currentModal == "TEXT_MODAL") {
            return (
                <Modal title={"Add/Edit Label for Region"} description={"Adding value to data property: gdp_value"} inputText={"Enter Value"} containsInput={true} />
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

    const toggleLabels = () => {
        updates.current.graphics.showLabels = !updates.current.graphics.showLabels;

        apis.updateMap(currentMap._id, updates.current).then((res) => {
            dispatch(updateMapInStore(updates.current))
        }).catch((err) => {
            console.log(err);
        })
    }

    const changeDataProp = (item) => {
        updates.current.graphics.dataProperty = item;
        apis.updateMap(currentMap._id, updates.current).then((res) => {
            dispatch(updateMapInStore(updates.current))
        }).catch((err) => {
            console.log(err);
        })
    }

    const border = (
        <div className="w-0.5 h-6 bg-gray-100 mx-1"></div>
    );

    const fontStyleMenu = (
        <div
            ref={ref}
            className="absolute overflow-y-auto max-h-44 w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Arial
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Times New Roman
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Helvetica
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Poppins
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Verdana
                    </button>
                </li>
            </ul>
        </div>
    )

    const labelPositionMenu = (
        <div
            ref={ref}
            className="absolute overflow-y-auto max-h-44 w-40 left-[-5px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Center
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Right
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Left
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        Top
                    </button>
                </li>
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
                                onClick={() => changeDataProp(item)}
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

    const exportMenu = (
        <div
            ref={ref}
            className="absolute w-28 left-[-44px] z-50 my-9 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow "
            id="user-dropdown"
        >
            <ul className="text-[13px] py-2" aria-labelledby="user-menu-button">
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        PNG
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left block px-5 py-2 text-gray-700 hover:bg-gray-100 "
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
                    onClick={toggleLabels}
                >
                    {currentMap.graphics.showLabels ? "Hide Labels" : "Show Labels"}
                </button>
                {border}
                <button className="px-1 hover:bg-violet-100" onClick={() => { openCurrentModal("TEXT_MODAL") }}>Add Text</button>
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
                <button className="px-1" >
                    <i className="fa-solid fa-minus"></i>
                </button>
                <input
                    type="text"
                    value={currentMap.graphics.fontSize}
                    maxLength={2}
                    className="w-6 text-center"
                />
                <button className="px-1">
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
                <div className="flex relative">
                    <button
                        onClick={() => { setMenu("regionColor") }}
                        className="px-1 hover:bg-violet-100"
                    >
                        Region Color
                    </button>
                    {menu == "regionColor" ? <div ref={ref} className="absolute left-[-5px] z-50 my-9"><ChromePicker /></div> : null}
                </div>
                {border}
                <div className="flex relative">
                    <button
                        onClick={() => { setMenu("borderColor") }}
                        className="px-1 hover:bg-violet-100"
                    >
                        Border Color
                    </button>
                    {menu == "borderColor" ? <div ref={ref} className="absolute left-[-5px] z-50 my-9"><ChromePicker /></div> : null}
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