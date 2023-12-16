import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateMapInStore } from "../../../../actions/map.js";
import apis from "../../../../api/api.js";

const Tags = () => {
    const [text, setText] = useState("");
    const [inputBox, setInputBox] = useState(false);

    const currentMap = useSelector((state) => state.map.currentMap);

    const dispatch = useDispatch();

    const handleAppendBox = () => {
        setInputBox(true);
    }

    const handleUpdateText = (event) => {
        setText(event.target.value);
    }

    const handleAddTag = (event) => {
        if (event.code === "Enter"){
            console.log(text);

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

            setInputBox(false);
        }
    }

    const handleEditTag = (event, key) => {
        if (event.detail == 2) {
            console.log(key);
        }
    }

    return (
        <div className="flex gap-3 items-center">
            {
                currentMap? currentMap.tags.map((tag, key) => {
                    return (
                        <div key={key} className="text-white bg-violet-400 hover:bg-violet-500 focus:outline-none rounded-full px-4 py-1.5 text-center mb-2 " onClick={() => handleEditTag(event, key)}>
                           {tag} 
                        </div>
                    )
                }) : null}

            {inputBox ? <div>
                    <input
                    type="search"
                    id="tagInput"
                    className="text-black bg-violet-100 focus:outline-1 focus:outline-violet-400 rounded-full px-4 py-1.5 text-center mb-2 "
                    placeholder="Enter Tag..."
                    required=""
                    onChange={handleUpdateText}
                    onKeyDown={handleAddTag}
                />
                </div> : null}

                    { currentMap && currentMap.tags.length == 0 ? <div className="text-gray-400">No tags</div> : null }
                <button onClick={handleAppendBox}>
                    <i className="fa-solid fa-plus"></i>
                </button>
        </div>
    )

}

export default Tags;