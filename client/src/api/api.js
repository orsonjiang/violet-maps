import axios from "axios";
import qs from "query-string";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

const postCreateMap = (data) => api.post("/map", data);
const getCurrentMap = (id) => api.get(`/map/${id}`);
const getMaps = (view, searchText, searchBy, username) => {
	return api.post(`/maps`, {
		view: view,
        searchText: searchText,
        searchBy: searchBy,
		username: username
	})
}
const updateMap = (id, data) => {
	return api.put(`/map/${id}`, {
		map: data
	})
}

const apis = {
	postCreateMap,
	getCurrentMap,
	getMaps,
	updateMap
};

export default apis;