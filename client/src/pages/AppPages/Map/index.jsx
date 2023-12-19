import { useSelector } from 'react-redux';

import Comments from './components/Comments';
import LeafletMap from './components/LeafletMap';
import Button from './components/Button';

const Map = () => {
    const { map } = useSelector((state) => state.map.present);

    if (!map) {
        return <div>Loading Map...</div>;
    }

    return (
        <div className="flex gap-8 m-8">
            <div className="w-2/3 flex flex-col gap-5 grow text-sm">
                <LeafletMap />
                <div>
                    <div>
                        <h3 className='font-semibold text-lg'>{map.name}</h3>
                        <h4 className="">{map.owner.username}</h4>
                        <div className="flex gap-3 items-center mt-3 text-xs whitespace-nowrap">
                            {map.tags.length != 0 ? map.tags.map((name) => {
                                return (<Tag name={name}/>)
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