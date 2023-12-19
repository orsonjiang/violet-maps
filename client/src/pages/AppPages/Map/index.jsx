import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import apis from '../../../api/api';
import { setModal } from '../../../actions/modal';
import { setMap, setSocial } from '../../../actions/map';

import Comments from './components/Comments';
import LeafletMap from './components/LeafletMap';
import Button from './components/Button';
import Loading from '../components/Loading';
import DropDown from '../Menus/DropDown';
import Tag from './components/Tag';

import { MenuTypes, ModalTypes } from '../../../constants';
import { convert, handleExportMap } from "../../../helpers";

const Map = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // const [ likeCount, setLikeCount ] = useState(map.social.likes.length);
    // const [ dislikeCount, setDislikeCount ] = useState(map.social.dislike.length);
    const { map, container } = useSelector((state) => state.map.present);
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
    
    const handleLike = () => {
        apis.addLike(id, user._id)
            .then((res) => {
                dispatch(setSocial(res.data.social))
            })
            .catch((err) => console.log(err));
    };

    const handleDislike = () => {
        apis.addDislike(id, user._id)
            .then((res) => {
                dispatch(setSocial(res.data.social))
            })
            .catch((err) => console.log(err));
    };

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
                        <Button className={"w-4"} handler={() => handleLike()} icon = {"fa-solid fa-thumbs-up"} text={map.social.likes.length}  disabled={user._id === ''}/>
                        <Button className={"w-4"} handler={() => handleDislike()} icon = {"fa-solid fa-thumbs-down"} text={map.social.dislikes.length} disabled={user._id === ''}/>
                        <DropDown type={MenuTypes.MAP_EXPORT} list={exportOptions} handleItem={handleExport} button={["Export", "fa-solid fa-file-export"]}/>
                        <Button handler={()=>{dispatch(setModal(ModalTypes.FORK_MAP))}} icon = {"fa-solid fa-copy"} text={"Fork"} disabled={user._id === ''}/>
                    </div>
                </div>
            </div>
            <Comments list={map.social.comments}/>
        </div>
    );
};

export default Map;