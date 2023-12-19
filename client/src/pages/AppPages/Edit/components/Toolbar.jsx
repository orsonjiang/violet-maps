import { useSelector } from 'react-redux';

import ToolbarBorder from './ToolbarBorder';
import UndoRedo from './UndoRedo';
import Label from './Label';
import Font from './Font';
import FontSize from './FontSize';
import Position from './Position';
import Text from './Text';
import Region from './Region';
import Border from './Border';
import Bubble from './Bubble';
import Choropleth from './Choropleth';
import Heat from './Heat';
import External from './External';
import Thumbnail from './Thumbnail';
import Publish from './Publish';
import Download from './Download';

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
        // <External />,
        <Thumbnail />,
        <Publish />,
        <Download />,
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
    const { map } = useSelector((state) => state.map.present);
    if (!map) return <div></div>;
    const mapName =
        map && map.name.length > 15 ? map.name.slice(0, 15) + '...' : map.name;

    return (
        <div className="flex grow text-sm gap-2">
            <div className="flex gap-2 items-center text-lg font-medium w-48 bg-white px-4 py-1 justify-between rounded-lg border border-violet-200 drop-shadow-sm text-neutral-800 align-middle">
                {mapName}
                <i
                    className="fa fa-edit text-xl text-indigo-500"
                    onClick={() => openCurrentModal('RENAME_MAP')}
                />
            </div>
            <Toolbar />
        </div>
    );
};

export default ToolbarWrapper;
