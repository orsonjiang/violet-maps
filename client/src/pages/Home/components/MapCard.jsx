import { Card, Typography, Menu, MenuHandler, MenuList, MenuItem, IconButton} from "@material-tailwind/react";

const MapCard = ({mapInfo}) => {
    return (
        <div>
            <Card className="px-1 pt-1 rounded-md">
                <Menu placement="bottom-end">
                    <MenuHandler>
                        <i className="absolute right-2 fas fa-ellipsis-h w-3 mr-1 text-white"/>
                    </MenuHandler>
                    <MenuList className="border-none">
                        <MenuItem className="hover:!bg-violet-200 text-violet-400">
                            <i className="fa fa-code-fork mr-2" />
                            Fork
                        </MenuItem>
                        <MenuItem className="hover:!bg-violet-200 text-violet-400">
                            <i className="fa fa-edit mr-2" />
                            Rename
                        </MenuItem>
                    </MenuList>
                </Menu>
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                alt="map-image"
                className="rounded-md"
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