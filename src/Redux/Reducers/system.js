import {ADD_BODY, BODIES} from "../Actions/constants";
import {cache, getCached} from "../Session";



const initialState = {
    bodies: getCached(BODIES) || [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_BODY:
            let newBodies = [...state.bodies, action.payload];
            cache(BODIES, newBodies);
            return {
                ...state,
                bodies: newBodies,
            };
        default: return state
    }
}