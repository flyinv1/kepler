import {UPDATE_SAVED_DATA} from "../constants";
import defaults from '../../Data/solarSystem';
import {getSaved, save} from "../storage";
import {USER_BODIES, SAVE_USER_BODY, DELETE_SAVED_USER_BODY} from "../constants";

const initialState = {
    savedBodies: {
        defaults: defaults,
        saved: getSaved(USER_BODIES),
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER_BODY:
            let newBodies = {...state.savedBodies.saved, [action.payload.id]: action.payload};
            save(USER_BODIES, newBodies);
            return {
                ...state,
                savedBodies: {
                    defaults: state.savedBodies.defaults,
                    saved: newBodies
                },
            };
        case DELETE_SAVED_USER_BODY:
            let currentBodies = {...state.savedBodies.saved};
            delete currentBodies[action.payload];
            save(USER_BODIES, currentBodies);
            return {
                ...state,
                savedBodies: {
                    defaults: state.savedBodies.defaults,
                    saved: currentBodies,
                }
            };
        case UPDATE_SAVED_DATA:
            save(USER_BODIES, action.payload);
            return {
                ...state,
                savedBodies: {
                    defaults: defaults,
                    saved: getSaved(USER_BODIES)
                }
            };
        default: return state
    }
}