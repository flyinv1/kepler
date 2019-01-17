import {ADD_BODY, REMOVE_BODY_BY_ID, DISPATCH_LOG, CLEAR_LOGS} from '../constants';

export const addBody = body => ({
    type: ADD_BODY,
    payload: body
});

export const removeBodyById = id => ({
    type: REMOVE_BODY_BY_ID,
    payload: id,
});

export const dispatchLog = object => ({
    type: DISPATCH_LOG,
    payload: object,
});

export const clearLogs = () => ({
    type: CLEAR_LOGS,
    payload: {},
});