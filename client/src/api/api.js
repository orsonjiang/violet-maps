import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

const getMaps = (view, searchBy, searchText) => {
    const options = {
        params: {
            view: view,
            searchBy: searchBy,
            searchText: searchText,
        }
    };

    return api.get("/maps", options);
};
const createMap = (data) => api.post("/map", data);
const getMap = (id, populate) => {
    const options = {
        params: {
            populate: populate
        }
    }
    return api.get(`/map/${id}`, options)
};
const updateMap = (id, data) => {
    return api.put(`/map/${id}`, data)
}
const updateMapImage = (id, data) => {
    return api.put(`/map/${id}/image`, {
        image: data
    })
}
const deleteMap = (id) => api.delete(`/map/${id}`);

const apis = {
    getMaps,
    createMap,
    getMap,
    updateMap,
    updateMapImage,
    deleteMap
};

export default apis;