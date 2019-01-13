import {ADD_BODY, REMOVE_BODY_BY_ID} from './constants';

export const addBody = body => ({
    type: ADD_BODY,
    payload: body
});

export const removeBodyById = id => ({
    type: REMOVE_BODY_BY_ID,
    payload: id,
});