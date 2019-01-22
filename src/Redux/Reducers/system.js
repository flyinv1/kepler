import {ADD_BODY, BODIES, REMOVE_BODY_BY_ID, SET_STEP_SIZE, SET_STEPS, STEP_SIZE, STEPS} from "../constants";
import {cache, getCached} from "../Storage";

const initialState = {
    bodies: getCached(BODIES) || [],
    steps: getCached(STEPS) || 365,
    stepSize: getCached(STEP_SIZE) || 86400,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_BODY:
            let appended = [...state.bodies, action.payload];
            cache(BODIES, appended);
            return {
                ...state,
                bodies: appended,
            };
        case REMOVE_BODY_BY_ID:
            let removed = [...state.bodies].filter(body => body.id !== action.payload);
            cache(BODIES, removed);
            return {
                ...state,
                bodies: removed
            };
        case SET_STEPS:
            let steps = parseInt(action.payload) || 365;
            cache(STEPS, steps);
            return {
                ...state,
                steps: steps
            };
        case SET_STEP_SIZE:
            let stepSize = parseInt(action.payload) || 86400;
            cache(STEP_SIZE, stepSize);
            return {
                ...state,
                stepSize: stepSize,
            };
        default: return state
    }
}