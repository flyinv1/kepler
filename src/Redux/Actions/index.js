import {ADD_BODY} from './constants';

export const addBody = body => ({
    type: ADD_BODY,
    payload: body
});