import domtoimage from "dom-to-image";

import { setModal } from '../actions/modal';
import { ModalTypes } from '../constants';
import apis from '../api/api';
import aws from "../api/aws";

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

export const handleExportMap = (mapContainer, map, type, download) => {
    const options = {
        filter: (node) => {
            return !(node.classList?.contains("leaflet-control-container")) // remove leaflet zoom toolbar from image
        },
        width: 1300,
        height: 755
    }

    if (download) {
        domtoimage.toPng(mapContainer, options)
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${map.name}.${type.toLowerCase()}`;
                link.click();
        })
    } else {
        domtoimage.toBlob(mapContainer, options)
            .then(async (blob) => {
                const postData = await apis.getMapPost(map._id);
                const fields = postData.data.fields;
                const formData = new FormData();

                Object.keys(fields).forEach((key) => {
                    formData.append(key, fields[key]);
                });
                formData.append("file", blob, `${map._id}.png`);
                
                await aws.postImage(postData.data.url, formData);
                apis.updateMapImage(map._id, `https://violet-maps-images.s3.amazonaws.com/${map._id}.png`);
            })
            .catch((err) => console.log(err))
    }
}