import {ADD_BODY, UPDATE_CENTER} from './constants';

export const addBody = body => ({
    type: ADD_BODY,
    payload: body
});

export const updateCenterBody = body => ({
    type: UPDATE_CENTER,
    payload: body
});

