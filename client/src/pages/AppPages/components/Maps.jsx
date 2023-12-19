import { useSelector } from "react-redux";

import MapCard from "./MapCard";
import { SortByTypes } from "../../../constants";

const Maps = () => {
    const { maps } = useSelector((state)=> state.maps);
    const { sortBy, searchText } = useSelector((state) => state.collate);

    if (!maps.length) {
        // TODO: Make no map graphics.
        return (
            <div>
                <div className="text-gray-400 text-sm">No maps</div>
            </div>
        );
    }

    let collated = () => {
        let filtered = !searchText ? maps : maps.filter((map) => map.name.toLowerCase().includes(searchText.toLowerCase()));

        switch (sortBy) {
            case SortByTypes.NAME:
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case SortByTypes.CREATION_DATE:
                return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case SortByTypes.LIKES:
                return filtered.sort((a, b) => b.social.likes.length - a.social.likes.length);
            case SortByTypes.DISLIKES:
                return filtered.sort((a, b) => b.social.dislikes.length - a.social.dislikes.length);
            default:
                return filtered;
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
