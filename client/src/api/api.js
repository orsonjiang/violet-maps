import axios from "axios";
import qs from "query-string";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

export default apis;