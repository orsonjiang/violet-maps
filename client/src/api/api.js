import axios from "axios";
import qs from "query-string";

axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

const getComments = () => api.get(`/comments`);
const addComment = (content) => api.post("/comments/add", {
	content: content
});
const editComment = (_id, content) => api.put("/comments/edit/" + _id, {
	content: content
});
const deleteComment = (_id) => api.delete("/comments/delete/" + _id);

const apis = {
	getComments,
	addComment,
	editComment,
	deleteComment,
};

export default apis;