import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`
})

const postRegister = (data) => api.post(`/register`, data);
const postLogin = (data) => api.post(`/login`, data);
const postLogout = () => api.post(`/logout`);
const postRequestReset = (data) => api.post(`/requestReset`, data);
const postReset = (data) => api.post(`/reset`, data);

const auths = {
	postRegister,
	postLogin,
	postLogout,
	postRequestReset,
	postReset,
};

export default auths;