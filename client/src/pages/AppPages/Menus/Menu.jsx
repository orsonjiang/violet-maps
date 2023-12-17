import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MenuTypes } from "../../../constants";
import { setMenu } from "../../../actions/menu";

const Menu = ({children}) => {
	const dispatch = useDispatch();

	const { menu } = useSelector((state) => state.menu);

    const closeMenus = (ref) => {
        useEffect(() => {
            const handleClickOutside = async (event) => {
                if (ref.current && !ref.current.contains(event.target) && menu !== MenuTypes.NONE) {
					await new Promise(r => setTimeout(r, 100));
					dispatch(setMenu(MenuTypes.NONE))
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref])
    }

    const ref = useRef(null);
    closeMenus(ref);

	return (
		<div ref={ref} className="">
			{children}
		</div>
	);
};

export default Menu;
