import axios from "axios";
import { options } from "../../../server/routes/apiRouter";

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

    return api.get("/maps", {}, options);
};
const createMap = (data) => api.post("/map", data);
const getMap = (id, populate) => {
    options = {
        params: populate
    }
    return api.get(`/map/${id}`, {}, options)
};
const updateMap = (id, data) => {
    return api.put(`/map/${id}`, {
        map: data
    })
}
const deleteMap = (id) => api.delete(`/map/${id}`);

const apis = {
    getMaps,
    createMap,
    getMap,
    updateMap,
    deleteMap
};

export default apis;