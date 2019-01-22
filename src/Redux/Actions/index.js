import {
    ADD_BODY,
    REMOVE_BODY_BY_ID,
    DISPATCH_LOG,
    CLEAR_LOGS,
    SET_HISTORY,
    SET_STEPS,
    SET_STEP_SIZE
} from '../constants';
import symplecticEuler from "../../Computation/symplecticEuler";

export const setSteps = steps => ({
    type: SET_STEPS,
    payload: steps,
});

export const setStepSize = stepSize => ({
    type: SET_STEP_SIZE,
    payload: stepSize,
});

export const addBody = body => ({
    type: ADD_BODY,
    payload: body
});

export const removeBodyById = id => ({
    type: REMOVE_BODY_BY_ID,
    payload: id,
});

export const dispatchLog = object => ({
    type: DISPATCH_LOG,
    payload: object,
});

export const clearLogs = () => ({
    type: CLEAR_LOGS,
    payload: {},
});

export const saveComputation = (history) => {
    return {
        type: SET_HISTORY,
        payload: history,
    }
};
