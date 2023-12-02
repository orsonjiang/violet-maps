import { useSelector } from "react-redux";

import MapCard from "./MapCard";

const Maps = () => {
    const { maps } = useSelector((state)=> state.map);

    if (!maps.length) {
        // TODO: Make no map graphics.
        return (
            <div>
                <div className="text-gray-400 text-sm">No maps</div>
            </div>
        );
    }

    return (
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {maps.map((map, index) => {
                return <MapCard key={"map-" + index} mapInfo={map} />;
            })}
        </div>
    );
};

export default Maps;
