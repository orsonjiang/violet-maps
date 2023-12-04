import { useState, useEffect, useRef } from "react";
import { ChromePicker } from "react-color"

import Dialog from "./components/Dialog";

const Legend = () => {
    const ref = useRef(null);

    const [menu, setMenu] = useState("none");

    const closeMenus = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setMenu("none");
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref])
    }
    closeMenus(ref);

    const LegendData = [
        {
            color: "#ED91C4",
            description: "< 1000"
        },
        {
            color: "#bd94f2",
            description: "= 1000"
        },
        {
            color: "#4287f5",
            description: "> 1000"
        }
    ]

    const LegendPositionMenu = (
        <div
            id="sort-by-dropdown"
            ref={ref}
            className="absolute w-full right-0 my-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow "
        >
            <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdown-button"
            >
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        bottomleft
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        bottomright
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        topleft
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                    >
                        topright
                    </button>
                </li>
            </ul>
        </div>
    )

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-50 justify-center items-center w-full h-full bg-gray-800/[0.6] inset-0 max-h-full"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                        <div className="flex flex-col px-6 space-y-4 my-3">
                            <h3 className="text-lg font-semibold text-black">
                                Add/Edit Legend
                            </h3>
                            <div className="text-sm flex gap-3 items-center">
                                Name:
                                <input type="text" placeholder="Name your legend" className="rounded-lg p-1.5 px-3 bg-gray-100 w-full" />
                            </div>
                            <div className="text-[14px] bg-purple-100 rounded-lg py-3 px-6 justify-center">
                                {LegendData.map((row, index) => {
                                    return (
                                        <div key={index}>
                                            <ol className="list-decimal list-inside my-3">
                                                <li className="flex gap-4 items-center">
                                                    <button style={{ backgroundColor: `${row.color}` }} className={`w-11 h-8`}></button>
                                                    <div className="w-full">{row.description}</div>
                                                    <i className="fa fa-edit mr-2 text-xl text-gray-500" />
                                                </li>
                                            </ol>
                                        </div>
                                    )
                                })}
                                <div className="flex gap-4 items-center mb-3">
                                    <div className="flex relative">
                                        <button onClick={() => { setMenu("color") }} className={`w-8 h-8 bg-white`}></button>
                                        {menu == "color" ? <div ref={ref} className="absolute left-[-3px] z-50 my-10"><ChromePicker /></div> : null}
                                    </div>
                                    <input type="text" placeholder="Description" className="rounded-lg p-1.5 px-3 w-full" />
                                </div>
                            </div>
                            <div className="text-sm flex gap-3 items-center justify-between">
                                Position:
                                <div className="relative">
                                    <button
                                        id="dropdown-button"
                                        data-dropdown-toggle="dropdown"
                                        className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-500 focus:outline-none "
                                        type="button"
                                        onClick={() => { setMenu("position") }}
                                    >
                                        bottomleft
                                        <svg
                                            className="w-2.5 h-2.5 ms-2.5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {menu == "position" ? LegendPositionMenu : null}
                                </div>
                            </div>
                            <Dialog />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Legend;
