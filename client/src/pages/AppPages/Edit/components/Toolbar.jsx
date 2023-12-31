import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ToolbarBorder from './ToolbarBorder';
import UndoRedo from './UndoRedo';
import Label from './Label';
import Font from './Font';
import FontSize from './FontSize';
import Position from './Position';
import Text from './Text';
import Region from './Region';
import Border from './Border';
import Choropleth from './Choropleth';
import Heat from './Heat';
import Bubble from './Bubble';
import Thumbnail from './Thumbnail';
import Fork from './Fork';
import Publish from './Publish';
import Download from './Download';
import Delete from './Delete';
import Tags from './Tags';
import { setModal } from '../../../../actions/modal';
import { ModalTypes } from '../../../../constants';


const Toolbar = () => {
    const tools = [
        <UndoRedo />,
        <ToolbarBorder />,
        <Label />,
        <Font />,
        <FontSize />,
        <Position />,
        <ToolbarBorder />,
        <Text />,
        <Region />,
        <Border />,
        <ToolbarBorder />,
        <Choropleth />,
        <Bubble />,
        <Heat />,
        <ToolbarBorder />,
        <Tags />,
        <Thumbnail />,
        <Publish />,
        <Download />,
        <Fork />,
        <Delete />
    ];

    return (
        <div className="flex grow bg-white px-4 py-1 justify-between rounded-lg border border-violet-200 drop-shadow-sm text-neutral-800 align-middle z-[550]">
            {tools.map((tool, index) => {
                return [
                    <div key={`tool-${index}`} className="flex gap-1">
                        {tool}
                    </div>,
                ];
            })}
        </div>
    );
};

const ToolbarWrapper = () => {
    const dispatch = useDispatch();
    
    const { id } = useParams();
    const { map } = useSelector((state) => state.map.present);
    const { user } = useSelector((state) => state.user);

    if (!map || map._id !== id || map.owner._id !== user._id) return <div className='grow'></div>;
    
    return (
        <div className="flex grow text-sm gap-2">
            <div className="flex gap-2 items-center text-md font-medium w-1/6 bg-white px-4 py-1 justify-between rounded-lg border border-violet-200 drop-shadow-sm text-neutral-800 align-middle">
                <div className='truncate'>
                    {map ? map.name : ""}
                </div>
                <button
                    className="fa fa-edit text-xl text-indigo-500 flex items-center px-1 hover:bg-gray-200 rounded-full"
                    onClick={() => dispatch(setModal(ModalTypes.RENAME_MAP))}
                    title='Rename Map'
                />
            </div>
            <Toolbar />
        </div>
    );
};

export default ToolbarWrapper;
