import {combineReducers} from "redux";
import systemReducer from './system';
import loggerReducer from './logger';

export default combineReducers({
    systemReducer,
    loggerReducer,
});