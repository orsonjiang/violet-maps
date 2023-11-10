import { Typography, Input, Button, Menu, MenuHandler, MenuList, MenuItem, IconButton } from "@material-tailwind/react";
import { useState } from "react";

const AppBanner = () => {
    const [searchBy, setSearchBy] = useState("Map Name")
	return (
        <div>
        <Typography className="font-semibold text-xl text-white p-2 text-center bg-gradient-to-r from-purple-300 to-indigo-300 shrink-0">Violet Maps</Typography>
        <div className="flex gap-3 m-5">
            <IconButton variant="text" className="hover:bg-transparent"><i className="fa fa-home text-2xl text-violet-500" /></IconButton>  {/* home button */}
            <IconButton variant="text" className="hover:bg-transparent"><i className="fas fa-globe-americas text-2xl text-violet-300" /></IconButton> {/* explore button */}
            {/* search bar */}
            <Input
                placeholder={"select search by criteria on the right"}
                labelProps={{className: "hidden"}}
                className="!border !border-white rounded-xl bg-white focus:!border-violet-400 focus:!border-1"
            />
            {/* search by menu */}
            <Menu className="">
                <MenuHandler>
                    <Button variant="text" className="hover:!bg-transparent rounded-xl p-3 normal-case text-sm shrink-0 text-indigo-500"> 
                        {searchBy}
                        <i className="fas fa-chevron-down ml-2" />
                    </Button>
                </MenuHandler>
                <MenuList className="mt-1 p-3 rounded-xl">
                    <MenuItem onClick={() => setSearchBy("Map Name")}>Map Name</MenuItem>
                    <MenuItem onClick={() => setSearchBy("Map Properties")}>Map Properties</MenuItem>
                </MenuList>
            </Menu>
            {/* logout menu */}
            <Menu placement="bottom-end">
                <MenuHandler>
                    <Button className="shadow-none hover:shadow-none font-medium bg-indigo-300 text-sm px-3 rounded-xl shrink-0">KF</Button>
                </MenuHandler>
                <MenuList className="mt-1 p-3 rounded-xl">
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
        </div>
	)
}

export default AppBanner;