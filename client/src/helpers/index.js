import domtoimage from "dom-to-image";

import { setModal } from '../actions/modal';
import { ModalTypes } from '../constants';
import apis from '../api/api';

export const closeModal = (dispatch) => {
	dispatch(setModal(ModalTypes.NONE));
};

export const convert = (map) => {
    const geojson = {
        type: 'FeatureCollection',
        features: [],
    }
    if (!map) return geojson;

    for (let i = 0; i < map.geometry.data.length; i++) {
        const feature = {
            type: 'Feature',
            properties: {
                index: i,
                ...map.properties.data[i],
            },
            geometry: map.geometry.data[i],
        }
        geojson.features.push(feature);
    }

    return geojson;
};

export const capitalize = (s) => s[0].toUpperCase() + s.slice(1).toLowerCase();

export const handleExportMap = (mapContainer, map, type, download, dispatch) => {
    const options = {
        filter: (node) => {
            return !(node.classList?.contains("leaflet-control-container")) // remove leaflet zoom toolbar from image
        },
        width: 1920,
        height: 1080
    }

    domtoimage.toPng(mapContainer, options)
        .then((dataUrl) => {
            if (download) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${map.name}.${type.toLowerCase()}`;
                link.click();
            } else {
                apis.updateMapImage(map._id, dataUrl);
            }
        })
}