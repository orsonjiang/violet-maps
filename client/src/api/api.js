import axios from "axios";
import qs from "query-string";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

const getMaps = (view, searchText, searchBy, username) => {
    // switching back for now - maps wouldn't show up
    return api.post(`/maps`, {
        view: view,
        searchText: searchText,
        searchBy: searchBy,
        username: username
    })
    // return api.get(`/maps`, {
    //     view: view,
    //     searchText: searchText,
    //     searchBy: searchBy,
    //     username: username
    // })
}
const postCreateMap = (data) => api.post("/map", data);
const getCurrentMap = (id) => api.get(`/map/${id}`);
const updateMap = (id, data) => {
    return api.put(`/map/${id}`, {
        map: data
    })
}
const deleteMap = (id) => api.delete(`/map/${id}`);

const apis = {
    postCreateMap,
    getCurrentMap,
    getMaps,
    updateMap,
    deleteMap
};

export default apis;