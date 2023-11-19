import { combineReducers } from 'redux';
import user from './user'
import modal from './modal';
import map from './map';

export default combineReducers({
	user,
	modal,
	map
});