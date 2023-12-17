import { combineReducers } from 'redux';

import collate from './collate';
import map from './map';
import menu from './menu';
import modal from './modal';
import newMap from './newMap';
import user from './user'

export default combineReducers({
    collate,
    map,
    menu,
    modal,
    newMap,
    user,
});