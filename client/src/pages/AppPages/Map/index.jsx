import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import apis from '../../../api/api';
import { setMap } from '../../../actions/map';

import Comments from './components/Comments';
import LeafletMap from './components/LeafletMap';
import Button from './components/Button';
import Loading from '../components/Loading';

const Map = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { map } = useSelector((state) => state.map.present);

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
                        <Button handler={()=>{}} icon = {"fa-solid fa-thumbs-up"} text={map.social.likes}/>
                        <Button handler={()=>{}} icon = {"fa-solid fa-thumbs-down"} text={map.social.dislikes}/>
                        <Button handler={()=>{}} icon = {"fa-solid fa-file-export"} text={"Export"}/>
                        <Button handler={()=>{}} icon = {"fa-solid fa-copy"} text={"Fork"}/>
                    </div>
                </div>
            </div>
            <Comments list={map.social.comments}/>
        </div>
    );
};

export default Map;