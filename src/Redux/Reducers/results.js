import { SET_HISTORY, CLEAR_HISTORY} from "../constants";
import { cache, getCached, save, getSaved } from "../storage";

const initialState = {
    history: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_HISTORY:
            return {
                ...state,
                maxRadius: action.payload.maxRadius,
                history: action.payload.history
            };
        case CLEAR_HISTORY:
            return {
                ...state,
                history: []
            };
        default: return state;
    }
}
