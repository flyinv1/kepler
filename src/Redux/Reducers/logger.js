import {CLEAR_LOGS, DISPATCH_LOG, LOGS} from "../constants";
import {cache, getCached} from "../storage";

const initialState = {
    logs: getCached(LOGS) || [
        {
            tag: "STARTUP",
            content: "Welcome to Kepler!"
        }, {
            tag: "STARTUP",
            content: "Add a body and start integrating!"
        }
    ],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case DISPATCH_LOG:
            let appended = [...state.logs, action.payload];
            cache(LOGS, appended);
            return {
                ...state,
                logs: appended,
            };
        case CLEAR_LOGS:
            cache(LOGS, []);
            return {
                ...state,
                logs: [],
            };
        default: return state
    }
}