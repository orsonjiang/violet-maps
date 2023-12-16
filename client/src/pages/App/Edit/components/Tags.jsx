import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateMapInStore } from "../../../../actions/map.js";
import apis from "../../../../api/api.js";

const Tags = () => {
    const [text, setText] = useState("");
    const [showInputBox, setShowInputBox] = useState(false);
    const [editKey, setEditKey] = useState(null);
    const [deleteKey, setDeleteKey] = useState(null);

    const currentMap = useSelector((state) => state.map.currentMap);

    const dispatch = useDispatch();

    const handleAppendBox = () => {
        setShowInputBox(true);
    }

    const handleUpdateText = (event) => {
        setText(event.target.value);
    }

    const handleAddTag = (event) => {
        if (event.code === "Enter"){
            console.log(text);

            if (text !== "") {
                const updates = { ...currentMap };
                delete updates["data"];

                updates.tags.push(text);
                console.log(updates);

                apis.updateMap(currentMap._id, updates).then((res) => {
                    console.log(res);
                    dispatch(updateMapInStore(updates))
                }).catch((err) => {
                    console.log(err);
                })
            }

            setText("");
            setShowInputBox(false);
        }
    }

    const handleOpenEdit = (event, key) => {
        if (event.detail == 2) {
            console.log(key);
            setEditKey(key);
        }
    }

    const handleEditTag = (event) => {
        if (event.code === "Enter") {
            console.log(text);
            if (text !== "") {

                const updates = { ...currentMap };
                delete updates["data"];

                updates.tags[editKey] = text;
                console.log(updates);

                apis.updateMap(currentMap._id, updates).then((res) => {
                    console.log(res);
                    dispatch(updateMapInStore(updates))
                }).catch((err) => {
                    console.log(err);
                })
            }

            setText("");
            setEditKey(null);
        }
    }

    const handleShowDelete = (event, key) => {
        setDeleteKey(key);
    }

    const handleHideDelete = () => {
        setDeleteKey(null);
    }

    const handleDelete = () => {
        const updates = { ...currentMap };
        delete updates["data"];

        updates.tags.splice(deleteKey, 1);
        console.log(updates);

        apis.updateMap(currentMap._id, updates).then((res) => {
            console.log(res);
            dispatch(updateMapInStore(updates))
        }).catch((err) => {
            console.log(err);
        })

        setDeleteKey(null);
    }

    return (
        <div className="flex gap-3 items-center">
            {
                currentMap? currentMap.tags.map((tag, key) => {
                    return (
                        <div key={key} className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 flex" onClick={() => handleOpenEdit(event, key)} onMouseEnter={() => handleShowDelete(event, key)} onMouseLeave={handleHideDelete}>
                            {key === editKey ? <input
                                type="text"
                                id="editInput"
                                className= "text-black rounded-full text-center"
                                defaultValue={tag}
                                required=""
                                onChange={handleUpdateText}
                                onKeyDown={handleEditTag}
                            /> : tag}
                            {key === deleteKey ? <div className="pl-1 cursor-pointer" onClick={handleDelete}><i className="fa-solid fa-minus"></i></div> : null }
                        </div>
                    )
                }) : null}

            {showInputBox ? <div>
                    <input
                    type="text"
                    id="tagInput"
                    className="text-black bg-violet-100 focus:outline-1 focus:outline-violet-400 rounded-full px-4 py-1.5 text-center mb-2 "
                    placeholder="Enter Tag..."
                    required=""
                    onChange={handleUpdateText}
                    onKeyDown={handleAddTag}
                />
                </div> : null}

                    { currentMap && (currentMap.tags.length == 0 && !showInputBox) ? <div className="text-gray-400">No tags</div> : null }
                <button onClick={handleAppendBox}>
                    <i className="fa-solid fa-plus"></i>
                </button>
        </div>
    )

}

export default Tags;