import {CLEAR_LOGS, DISPATCH_LOG, LOGS} from "../constants";
import {cache, getCached} from "../Storage";

const initialState = {
    logs: getCached(LOGS) || [
        {
            tag: "hello",
            content: [
                1, 2, 3
            ]
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
            return {
                ...state,
                logs: [],
            };
        default: return state
    }
}