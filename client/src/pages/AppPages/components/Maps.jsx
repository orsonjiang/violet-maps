import { useSelector } from "react-redux";

import MapCard from "./MapCard";
import { SortByTypes } from "../../../constants";

const Maps = () => {
    const { maps } = useSelector((state)=> state.maps);
    const { sortBy } = useSelector((state) => state.collate);

    if (!maps.length) {
        // TODO: Make no map graphics.
        return (
            <div>
                <div className="text-gray-400 text-sm">No maps</div>
            </div>
        );
    }

    let collated = () => {
        switch (sortBy) {
            case SortByTypes.NAME:
                return maps.sort((a, b) => a.name.localeCompare(b.name));
            case SortByTypes.CREATION_DATE:
                return maps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case SortByTypes.LIKES:
                return maps.sort((a, b) => b.social.likes.length - a.social.likes.length);
            case SortByTypes.DISLIKES:
                return maps.sort((a, b) => b.social.dislikes.length - a.social.dislikes.length);
            default:
                return maps;
        }
    };

    

    return (
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {collated().map((map, index) => {
                return <MapCard key={"map-" + index} map={map} />;
            })}
        </div>
    );
};

export default Maps;
