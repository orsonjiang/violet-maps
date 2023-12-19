import { useDispatch } from "react-redux";
import { setSearchText } from "../../../actions/collate";


const SearchBar = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex w-full border h-10 rounded bg-white">
            {/* <div className="border px-3 flex items-center bg-slate-300">
            </div> */}

            <input className="grow px-4 outline-none" placeholder="Search Maps" onChange={(event) => dispatch(setSearchText(event.target.value))}>

            </input>

            <div className="px-3 flex items-center">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )

}

export default SearchBar;