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
            const body = action.payload;
            return {
                ...state,
                bodies: [...state.bodies, body],
            };
        case UPDATE_CENTER:
            const center = action.payload;
            console.log(center);
            return {
                ...state,
                centerBody: center,
            };
        default: return state
    }
}