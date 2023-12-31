import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import * as shapefile from 'shapefile';
import { kml } from '@tmcw/togeojson';
import simplifyGeojson from 'simplify-geojson';

import { ModalTypes } from '../../../constants';
import { setNewMap } from '../../../actions/newMap';
import { setModal } from '../../../actions/modal';
import apis from '../../../api/api';

import Modal from './Modal';
import { closeModal } from '../../../helpers';

const UploadMap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileInput = useRef(null);
    const [parsedFilename, setParsedFilename] = useState('');
    const [filename, setFilename] = useState('');
    const [geojson, setgeojson] = useState(null);
    const [error, setError] = useState('');

    const handleClick = () => {
        fileInput.current.click();
    };

    const validExt = (file, expected) => {
        return file.substring(file.lastIndexOf('.')) === expected;
    };

    const parseFilename = (s) => s.substring(0, s.indexOf('.'));

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
                    setParsedFilename(parseFilename(files[0].name));
                };
            } else if (validExt(fileName, '.kml')) {
                reader.readAsText(files[0]);

                reader.onload = () => {
                    setgeojson(
                        kml(
                            new DOMParser().parseFromString(
                                reader.result,
                                'text/xml'
                            )
                        )
                    );
                    setFilename(files[0].name);
                    setParsedFilename(parseFilename(files[0].name));
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

                if (
                    validExt(files[0].name, '.shp') &&
                    validExt(files[1].name, '.dbf')
                ) {
                    shp = await readFileAsArrayBuffer(files[0]);
                    dbf = await readFileAsArrayBuffer(files[1]);
                    setFilename(files[0].name + ', ' + files[1].name);
                    setParsedFilename(parseFilename(files[0].name));
                } else if (
                    validExt(files[0].name, '.dbf') &&
                    validExt(files[1].name, '.shp')
                ) {
                    shp = await readFileAsArrayBuffer(files[1]);
                    dbf = await readFileAsArrayBuffer(files[0]);
                    setFilename(files[0].name + ', ' + files[1].name);
                    setParsedFilename(parseFilename(files[1].name));
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

    const handleConfirm = async () => {
        if (geojson === null) {
            return setError('Please upload a file :)');
        }

        // if (geojson.customFileType === "violetmaps") {
        //     const newJson = geojson;
        //     delete newJson.geometry._id
        //     delete newJson.properties._id
        //     delete newJson.graphics._id

        //     console.log({
        //         name: newJson.name,
        //         geometry: newJson.geometry,
        //         properties: newJson.properties,
        //         graphics: newJson.graphics,
        //         social: {
        //             image: newJson.social.image
        //         }
        //     })

        //     return apis.createMap({
        //         name: newJson.name,
        //         geometry: newJson.geometry,
        //         properties: newJson.properties,
        //         graphics: newJson.graphics,
        //         social: {
        //             image: newJson.social.image
        //         }
        //     })
        //         .then((res) => {
        //             closeModal(dispatch);
        //             navigate(`/app/edit/${res.data.id}`);
        //         })
        //         .catch((err) => console.log(err));
        // }

        const simplified = simplifyGeojson(geojson, 0.005);
        const geometry = [];
        const properties = [];

        for (let i = 0; i < simplified.features.length; i++) {
            const feature = simplified.features[i];
            geometry.push(feature.geometry);
            properties.push(feature.properties);
        }

        dispatch(
            setNewMap({
                name: parsedFilename,
                geometry: geometry,
                properties: properties,
                graphics: {
                    style: Array(simplified.features.length).fill({
                        fill: '#f3e8ff00',
                        border: '#97a8fc',
                        bubble: {
                            radius: 1,
                            fill: '#E9D5FF',
                            border: '#97A8FC',
                        },
                    }),
                    label: {
                        isDisplayed: false,
                        fontStyle: 'font-sans',
                        fontSize: 12,
                        position: 'center',
                    },
                    heat: {
                        isDisplayed: false,
                    },
                    bubble: {
                        isDisplayed: false,
                        color: "#8187DC"
                    },
                    choropleth: {
                        isDisplayed: false,
                        color: "#8187DC"
                    },
                    legend: {
                        name: "",
				        position: "bottomleft",
				        visible: false
                    },
                },
                social: {
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/A_large_blank_world_map_with_oceans_marked_in_blue.PNG/640px-A_large_blank_world_map_with_oceans_marked_in_blue.PNG"
                }
            })
        );
        dispatch(setModal(ModalTypes.CHOOSE_TEMPLATE));
    };

    return (
        <Modal title={'Upload Map'} confirm={handleConfirm}>
            <div className='flex flex-col gap-3'>
                <div className="bg-purple-50 rounded-lg p-6 flex justify-center text-center text-[#938F99] border-dotted border-2 border-[#560BAD]">
                    <div>
                        <i className="fa-solid fa-cloud-arrow-up text-[2rem] mb-3"></i>
                        <div>
                            <button
                                className="font-semibold underline"
                                onClick={handleClick}
                            >
                                Click to upload
                                <input
                                    type="file"
                                    accept=".json, .geojson, .shp, .dbf, .kml"
                                    id="file-upload"
                                    ref={fileInput}
                                    style={{ display: 'none' }}
                                    onChange={handleUpload}
                                    multiple
                                />
                            </button>
                            {/* <p>or drag and drop</p> */}
                        </div>
                        <p className="text-sm mt-1">
                            .JSON, .GEOJSON, .SHP/.DBF, .KML
                        </p>
                    </div>
                </div>
                {error != '' && geojson == null ? (
                    <p className="text-sm text-red-500">Error: {error}</p>
                ) : null}
                {geojson != null ? (
                    <p className="text-sm text-purple-500">
                        Files Uploaded: {filename}
                    </p>
                ) : null}
            </div>
        </Modal>
    );
};

export default UploadMap;
