import { useEffect, useState } from 'react'
import TempMap from '../images/TempMap.png';

const SelectedScreen = () => {

    return ( 
        <div>
            {/* <div className="flex justify-center">
                <h2 className='font-extrabold text-2xl'>Map of Europe</h2>
            </div> */}
            <div className="grid grid-cols-3 gap-5 m-10">
                <div className='col-span-2'>
                    <img src={TempMap} alt="" className='rounded-lg shadow-md'/>
                    <div className='grid grid-cols-3 grid-row-2 my-4'>
                        <div className='col-span-1 row-span-2'>
                            <h3 className='font-bold text-lg'>Map of Europe</h3>
                            <h4>Jane Kim</h4>
                        </div>
                        <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-up pr-2"></i>98</button>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'><i className="fa-solid fa-thumbs-down pr-2"></i>15</button>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'>Export</button>
                            <button className='rounded-full bg-[#8187DC] py-1.5 px-4 shadow-lg text-white'>Fork</button>
                        </div>
                   </div>
                   <div>
                        <div>tags</div>
                   </div>
                </div>
                <div className='col-span-1'>
                    comments
                </div>
            </div>

        </div>
    )
}

export default SelectedScreen;