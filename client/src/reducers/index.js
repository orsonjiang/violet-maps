import { combineReducers } from 'redux';
import undoable, { excludeAction } from 'redux-undo';

import { mapTypes } from '../actionTypes';

import collate from './collate';
import map from './map';
import maps from './maps';
import menu from './menu';
import modal from './modal';
import newMap from './newMap';
import user from './user'


export default combineReducers({
    collate,
    map: undoable(map, {filter: excludeAction([mapTypes.SET_REGION, mapTypes.SET_MAP_CONTAINER, mapTypes.SET_LAYER_PROPERTY])}),
    maps,
    menu,
    modal,
    newMap,
    user,
});