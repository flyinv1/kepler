import {ADD_BODY, UPDATE_CENTER} from "../Actions/constants";

const initialState = {
    bodes: [],
    centerBody: {
        radius: 0,
        mass: 0,
        mu: 0,
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_BODY:
            return {
                ...state,
                // bodies: [...state.bodies, action.payload],
            };
        case UPDATE_CENTER:
            return {
                ...state,
                centerBody: action.payload,
            };
        default: return state
    }
}