import UndoRedo from './UndoRedo';
import Label from './Label';
import Font from './Font';
import FontSize from './FontSize';
import Position from './Position';
import Text from './Text';
import Region from './Region';
import Border from './Border';
import Legend from './Legend';
import Property from './Property';
import Bubble from './Bubble';
import Heat from './Heat';
import External from './External';

const Toolbar = () => {
    const tools = [
        <UndoRedo />,
        <Label />,
        <Font />,
        <FontSize />,
        // <Position />,
        <Text />,
        // <Region />,
        // <Border />,
        // <Legend />,
        // <Property />,
        // <Bubble />,
        // <Heat />,
        // <External />,
    ];

    return (
        <div className="flex flex-wrap bg-white p-2 px-4 mx-5 my-2 justify-between rounded-lg border border-violet-200 drop-shadow-sm text-neutral-800 align-middle" style={{ zIndex: 1000 }}>
            {tools.map((tool, index) => {
                return [
                    // If the element isn't the first one add a border before it.
                    index ? (
                        <div
                            key={`border-${index}`}
                            className="w-0.5 h-6 bg-gray-100 mx-1"
                        ></div>
                    ) : (''),
                    <div key={`tool-${index}`} className="flex gap-1">
                        {tool}
                    </div>,
                ];
            })}
        </div>
    );
};

export default Toolbar;
