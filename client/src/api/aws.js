import axios from "axios";

axios.defaults.withCredentials = true;

const postImage = (url, data) => {
	return axios.post(url, data);
};

const aws = {
    postImage,
};

export default aws;