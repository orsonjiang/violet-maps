import axios from "axios";
import qs from "query-string";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

const postCreateMap = (data) => {
	return api.post("/map", data, {
		'Content-Type': `multipart/form-data;`,
	})
}
const getCurrentMap = (id) => api.get(`/map/${id}`);
const getMaps = (view, searchText, searchBy) => {
	return api.post(`/maps`, {
		view: view,
        searchText: searchText,
        searchBy: searchBy
	})
}


const apis = {
	postCreateMap,
	getCurrentMap,
	getMaps
};

export default apis;