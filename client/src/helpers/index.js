import { setModal } from '../actions/modal';
import { ModalTypes } from '../constants';

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