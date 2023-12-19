import { useSelector } from 'react-redux';

const Viewbar = () => {
    const { map } = useSelector((state) => state.map.present);
    if (!map || map._id !== id) {
        return <div className='grow'></div>;
    }

    return (
        <div className="flex grow text-sm gap-2">
            <div className="flex items-center text-lg font-medium bg-white px-4 py-1 justify-between rounded-lg border border-violet-200 drop-shadow-sm text-neutral-800 align-middle w-1/4 truncate">
                {map.name}
            </div>
        </div>
    );
};

export default Viewbar;
