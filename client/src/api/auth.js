import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`
})

const postRegister = (data) => api.post(`/register`, data);
const postLogin = (data) => api.post(`/login`, data);
const postLogout = () => api.post(`/logout`);

const auths = {
    postRegister,
    postLogin,
    postLogout,
};

export default auths;