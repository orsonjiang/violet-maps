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
            properties: map.properties.data[i],
            geometry: map.geometry.data[i],
            index: i
        }
        geojson.features.push(feature);
    }

    return geojson;
};