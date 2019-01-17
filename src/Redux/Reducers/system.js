import {ADD_BODY, BODIES, REMOVE_BODY_BY_ID} from "../constants";
import {cache, getCached} from "../Storage";

const initialState = {
    bodies: getCached(BODIES) || [],
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
        default: return state
    }
}