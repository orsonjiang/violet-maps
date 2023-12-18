import { combineReducers } from 'redux';
import undoable from 'redux-undo';

import collate from './collate';
import map from './map';
import maps from './maps';
import menu from './menu';
import modal from './modal';
import newMap from './newMap';
import user from './user'

export default combineReducers({
    collate,
    map: undoable(map),
    maps,
    menu,
    modal,
    newMap,
    user,
});