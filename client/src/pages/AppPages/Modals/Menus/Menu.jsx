import { useDispatch } from "react-redux";

import { MenuTypes } from "../../../../constants";
import { setMenu } from "../../../../actions/menu";

const Menu = ({children}) => {
	const dispatch = useDispatch();

	return (
		<div className="w-3/5" onBlur={() => dispatch(setMenu(MenuTypes.NONE))}>
			{children}
		</div>
	);
};

export default Menu;
