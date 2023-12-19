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

const addComment = (id, data) => {
    return api.put(`/map/${id}/comment`, {
        comment: data.comment,
        user: data.user
    })
}

const publishMap = (id) => {
    return api.put(`/map/${id}/publish`)
}
const deleteMap = (id) => api.delete(`/map/${id}`);
const forkMap = (id, name) => api.post(`/map/${id}/fork`, {
    name: name
});

const apis = {
    getMaps,
    createMap,
    getMap,
    updateMap,
    updateMapImage,
    publishMap,
    deleteMap,
    forkMap,
    addComment
};

export default apis;