import CommentCard from "./components/commentcard";
import Modal from "../components/Modal";
import { useState } from 'react';

const Map = () => {
    const [modal, setModal] = useState("");

    const openModal = (type) => {
        if (modal){
            setModal("");
        }
        else if (type == "fork"){
            setModal("fork");
        }
    }

    return (
        <div className="md:grid grid-cols-3 gap-5 m-10 pb-10 max-md:block">
            {modal == "fork" ? <Modal title={"Fork Map?"} description={"Confirm by typing a name for the Map of Europe"} containsInput={true} /> : ""}
                <div className='col-span-2'>
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/1024px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                    alt="map-image"
                    className="rounded-lg shadow-md"/>
                    <div className='grid grid-cols-3 grid-row-2 my-4'>
                        <div className='col-span-1 row-span-2'>
                            <h3 className='font-bold text-lg'>Map of Europe</h3>
                            <h4 className="font-medium">Jane Kim</h4>
                            <div className="flex space-x-2 text-xs font-semibold mt-4">
                                <button className="px-4 py-1 bg-[#560BAD] text-white rounded-full">Heat Map</button>
                                <button className="px-4 py-1 bg-[#560BAD] text-white rounded-full">Europe</button>
                                <button className="px-4 py-1 bg-[#560BAD] text-white rounded-full">Labels</button>
                            </div>
                        </div>
                        <div className='col-span-2 flex space-x-2 justify-end text-xs font-medium flex-wrap'>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-up pr-2"></i>98</button>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-down pr-2"></i>15</button>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i class="fa-solid fa-file-export pr-2"></i>Export</button>
                        <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white' onClick={() => {openModal("fork")}}><i class="fa-solid fa-copy pr-2"></i>Fork</button>
                        </div>
                    </div>
                
                </div>
                <div className='col-span-1 bg-[#8187dc18] rounded-lg self-start'>   
                    <div className="m-5 mb-1">
                        <h3 className="font-semibold pt-5 md:pt-0">25 Comments</h3>
                        <div className="mt-3 flex space-x-4">
                            <button className="font-semibold bg-indigo-300 text-xs p-3 rounded-full shrink-0">
                                {'KF'}
                            </button>
                            <input
                                type="search"
                                id="search-dropdown"
                                className="block p-1.5 w-full text-sm rounded-lg drop-shadow-sm focus:outline-none focus:ring-2"
                                placeholder="Add a comment..."
                                required=""
                            />
                        </div>
                        <div className="overflow-hidden hover:overflow-y-scroll max-h-[30rem] mt-3">
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                            <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        <CommentCard initials={'FL'} name={'Fanny Li'} comment={'This map is great! I am going to be exporting it for my class in Geography. Thank you for putting this together!'} />
                        
                        </div>
                
                    </div>
                </div>
        </div>
    );
};

export default Map;
