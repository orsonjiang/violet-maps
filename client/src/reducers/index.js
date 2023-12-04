import { combineReducers } from 'redux';

import collate from './collate';
import map from './map';
import modal from './modal';
import user from './user'

export default combineReducers({
    collate,
    map,
    modal,
    user,
});