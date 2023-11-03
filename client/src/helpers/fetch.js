import api from "../api/api";
import store from "../store";
import { setComments } from "../actions";

export const fetchComments = async () => {
	let res = await api.getComments();
	store.dispatch(setComments(res.data.comments))
};