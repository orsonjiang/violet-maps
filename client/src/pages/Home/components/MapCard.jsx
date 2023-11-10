import { Card, Typography, Menu, MenuHandler, MenuList, MenuItem, IconButton} from "@material-tailwind/react";

const MapCard = ({mapInfo}) => {
    return (
        <div>
            <Card className="px-1">
                <Menu placement="bottom-end">
                    <MenuHandler>
                        <i className="relative fas fa-ellipsis-h text-right text-purple-300"/>
                    </MenuHandler>
                    <MenuList className="bg-violet-300 border-none">
                        <MenuItem className="hover:!bg-violet-300 text-white">Fork</MenuItem>
                        <MenuItem className="hover:!bg-violet-300 text-white">Rename</MenuItem>
                    </MenuList>
                </Menu>
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                alt="map-image"
                />
                <div className="m-3">
                    <Typography variant="h6" color="blue-gray">{mapInfo.name}</Typography>
                    <Typography className="text-sm font-medium text-violet-400">{mapInfo.owner}</Typography>
                </div>
            </Card>
        </div>
    );
}

export default MapCard;