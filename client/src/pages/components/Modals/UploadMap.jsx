import { useState, useRef } from "react";
import { closeModal, openModal } from "../../../actions/modal";
import { useDispatch } from 'react-redux';
import * as shapefile from 'shapefile';
import { kml } from '@tmcw/togeojson';
import { createMap } from "../../../actions/map";
import geobuf from "geobuf";
import Pbf from "pbf";

const UploadMap = () => {
    const fileInput = useRef(null);
    const [error, setError] = useState('');
    const [geojson, setgeojson] = useState(null);
    const [filename, setFilename] = useState('');

    const dispatch = useDispatch()

    const closeUploadModal = () => {
        dispatch(closeModal());
    }

    const handleClick = () => {
        fileInput.current.click();
    }

    const validExt = (file, expected) => {
        return file.substring(file.lastIndexOf('.')) === expected;
    };

    const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();

            fr.onload = function () {
                resolve(fr.result);
            };

            fr.onerror = function () {
                reject(fr);
            };

            fr.readAsArrayBuffer(file);
        });
      };

    const handleUpload = (event) => {
        setError('');
        setgeojson(null);
    
        const files = event.target.files;
    
        if (files.length == 1) {
            let reader = new FileReader();
            const fileName = files[0].name;
            if (validExt(fileName, '.json') || validExt(fileName, '.geojson')) {
                reader.readAsText(files[0]);
                
                reader.onload = () => {
                    setgeojson(JSON.parse(reader.result));
                    setFilename(files[0].name);
                };
            } else if (validExt(fileName, '.kml')) {
                reader.readAsText(files[0]);
    
                reader.onload = () => {
                    setgeojson(kml(new DOMParser().parseFromString(reader.result, 'text/xml')));
                    setFilename(files[0].name);
                };
            } else {
                setError(
                    'You uploaded one file but the file format was not a JSON file or a KML file. If you are uploading a SHP file, please select a DBF file as well.'
                );
                setgeojson(null);
            }
        } else if (files.length == 2) {
            async function asyncFunction() {
                let shp;
                let dbf;
    
                if (validExt(files[0].name, '.shp') && validExt(files[1].name, '.dbf')) {
                    shp = await readFileAsArrayBuffer(files[0]);
                    dbf = await readFileAsArrayBuffer(files[1]);
                    setFilename(files[0].name + ", " + files[1].name);
                } else if (validExt(files[0].name, '.dbf') && validExt(files[1].name, '.shp')) {
                    shp = await readFileAsArrayBuffer(files[1]);
                    dbf = await readFileAsArrayBuffer(files[0]);
                    setFilename(files[0].name + ", " + files[1].name);
                } else {
                    setError(
                        'The file formats of the two files you have uploaded are incorrect. One file should be a SHP file and one file should be a DBF file.'
                    );
                    setgeojson(null);
                }
    
                shapefile.read(shp, dbf).then((r) => setgeojson(r));
            }
    
            asyncFunction();
        } else {
            setError(
                'You uploaded more than 2 files. Please upload one file if it is a JSON or KML file, or upload two files if you have a SHP + DBF file.'
            );
            setgeojson(null);
        }
    };

    const handleClickConfirm = async () => {
        if (geojson == null) {
            setError(
                'Please upload a file :)'
            );
        } else {

            // create blob from json, then transform to readable stream
            // const stream = new Blob([JSON.stringify(geojson)], {
            //     type: 'application/json',
            // }).stream();

            // gzip compression
            // const compressed = stream.pipeThrough(new CompressionStream("gzip"));

            // create response
            // const response = new Response(compressed);
            // Get response Blob
            // const blob = await response.blob();
            // Get the ArrayBuffer
            // const buffer = geobuf.encode(geojson, new Pbf());

            // const buffer = await blob.arrayBuffer();
            // const blobtext = await blob.text();
            // console.log(typeof blobtext);

            // convert to base64 encoded string
            // const str = new Uint8Array(buffer).reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');
            // console.log(str);
            // const base64 = btoa(new Uint8Array(buffer).reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), ''));
            // console.log(base64);

            

            let features = []
            let style = {
                fill: "#E9D5FF",
                border: "#A5B4FC",
                bubble: { 
                    radius: 1,
                    fill: "#E9D5FF",
                    border: "#A5B4FC",
                },
            }
            for (let i = 0; i < geojson.features.length; i++) {
                features.push({
                    properties: geojson.features[i].properties,
                    style: style
                })
            }
            dispatch(createMap({
                data: geojson,
                features: features
            }));

            dispatch(openModal("CHOOSE_TEMPLATE"));
        }
    }

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="flex fixed z-50 bg-gray-800/[0.6] justify-center items-center w-full h-full inset-0 max-h-full"
        >
            <div className="relative w-full max-w-md max-h-md" >
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="p-2 md:mt-0 flex flex-col">
                    
                        <div className="flex flex-col px-4 lg:py-0 space-y-5 my-3">
                            <h3 className="text-lg font-semibold  text-black text-left">
                                Upload Map
                            </h3>
                            
        
                            <div className="bg-purple-50 rounded-lg p-6 flex justify-center text-center text-[#938F99] border-dotted border-2 border-[#560BAD]">
                                <div>
                                    <i className="fa-solid fa-cloud-arrow-up text-[2rem] mb-3"></i>
                                    <div>
                                        <button className="font-semibold underline" onClick={handleClick}>
                                            Click to upload
                                            <input
                                                type="file"
                                                accept=".json, .geojson, .shp, .dbf, .kml"
                                                id="file-upload"
                                                ref={fileInput}
                                                style={{display: 'none'}}
                                                onChange={handleUpload}
                                                multiple
                                            />
                                        </button>
                                        {/* <p>or drag and drop</p> */}
                                    </div> 
                                    <p className="text-sm mt-1">.JSON, .GEOJSON, .SHP/.DBF, .KML</p>
                                </div>
                            </div> 
                            {error != '' && geojson == null
                                ? <p className="text-sm text-red-500">Error: {error}</p> 
                                : null}
                            {geojson != null 
                                ? <p className="text-sm text-purple-500">Files Uploaded: {filename}</p> 
                                : null}
                            <div className='grid grid-cols-4 grid-row-1 my-4'>
                                <div className='col-span-2 flex space-x-2 justify-end text-sm'>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-white bg-[#8187DC] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
                                        onClick={() => handleClickConfirm()}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-[#686868] bg-[#D9D9D9] rounded-full py-1.5 px-5 shadow-md text-center focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                                        onClick={closeUploadModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div> 
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadMap;
