import {combineReducers} from "redux";
import systemReducer from './system';
import loggerReducer from './logger';
import savedReducer from './saved';
import resultsReducer from './results';

export default combineReducers({
    systemReducer,
    loggerReducer,
    savedReducer,
    resultsReducer,
});