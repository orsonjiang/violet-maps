import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import apis from '../../../api/api';
import { setMap, addLike, addDislike } from '../../../actions/map';

import Comments from './components/Comments';
import LeafletMap from './components/LeafletMap';
import Button from './components/Button';
import Loading from '../components/Loading';
import DropDown from '../Menus/DropDown';
import Tag from './components/Tag';
import { MenuTypes } from '../../../constants';

const Map = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [activeBtn, setActiveBtn] = useState("none");
    const { map } = useSelector((state) => state.map.present);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        apis.getMap(id, ['owner', 'geometry', 'properties', 'graphics', "social.comments",  {path: "social.comments", populate: {path: 'user'}}])
            .then((res) => {
                dispatch(setMap(res.data.map));
            })
            .catch((err) => console.log(err));
    }, [])

    if (!map || map._id !== id) {
        return <Loading>
            Loading Map...
        </Loading>;
    };

    const handleExport = (type) => {
        if (type === "JSON") {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(convert(map)));
            const link = document.createElement('a');
            link.href = dataStr;
            link.download = `${map.name}.json`;
            link.click();
        } else {
            handleExportMap(container, map, type, true);
        }

    };
    
    // Kevin code - handleLike() not working as intended.

    const handleLike = (event) => {
        console.log(map.social.likes);
        console.log(user._id);
        if (map.social.likes.indexOf(user._id) < 0) {
            console.log('user hasnt liked the current map yet');
            dispatch(addLike({
                ID: user._id,
            }));
            console.log('going to add like');
            apis.addLike(id, {
                ID: user._id,
            }).catch((err) => console.log(err));
        };
        if (activeBtn== "none" || activeBtn == "dislike") {
            setActiveBtn("like");
        };
    };
    
    // Kevin code - handleDislike() not working as intended.

    const handleDislike = (event) => {
        console.log(map.social.dislikes);
        console.log(user._id);
        if (map.social.dislikes.indexOf(user._id) < 0) {
            console.log('user hasnt disliked the current map yet');
            dispatch(addDislike({
                ID: user._id,
            }));
            console.log('going to add dislike');
            apis.addDislike(id, {
                ID: user._id,
            }).catch((err) => console.log(err));
        };
        if (activeBtn== "none" || activeBtn == "like") {
            setActiveBtn("dislike");
        };
    };

    const Icon = (<i className="fa-solid fa-download"></i>);

    const exportOptions = ["PNG", "JPEG", "JSON"];

    return (
        <div className="flex gap-8 m-8">
            <div className="w-2/3 flex flex-col gap-5 grow text-sm">
                <LeafletMap />
                <div>
                    <div>
                        <h3 className='font-semibold text-lg'>{map.name}</h3>
                        <h4 className="">{map.owner.username}</h4>
                        <div className="flex gap-3 items-center mt-3 text-xs whitespace-nowrap">
                            {map.tags.length != 0 ? map.tags.map((name, key) => {
                                return (<Tag name={name} key={key}/>)
                            }) : (<div className="text-xs text-gray-300">No tags</div>)}
                        </div>
                    </div>
                    <div className='flex space-x-2 justify-end text-xs font-medium flex-wrap'>
                        <Button onClick={(event) => { handleLike(event)}} icon = {"fa-solid fa-thumbs-up"} text={map.social.likes.length}/>
                        <Button onClick={(event) => { handleDislike(event)}} icon = {"fa-solid fa-thumbs-down"} text={map.social.dislikes.length}/>
                        {/* <Button handler={()=>{}} icon = {"fa-solid fa-file-export"} text={"Export"}/> */}
                        <DropDown type={MenuTypes.EDIT_EXPORT} list={exportOptions} handleItem={handleExport} icon={Icon}/>
                        <Button handler={()=>{}} icon = {"fa-solid fa-copy"} text={"Fork"}/>
                    </div>
                </div>
            </div>
            <Comments list={map.social.comments}/>
        </div>
    );
};

export default Map;