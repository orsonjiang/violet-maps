const MapCard = ({ mapInfo }) => {
    return (
        <div>
            <div className="p-1 pt-1 rounded-md bg-white">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                    alt="map-image"
                    className="rounded-md"
                />
                <div className="m-3">
                    <div color="blue-gray">
                        {mapInfo.name}
                    </div>
                    <div className="text-sm font-medium text-violet-400">
                        {mapInfo.owner}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapCard;
