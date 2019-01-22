
export const getSystemReducer = store => store.systemReducer;
export const getBodies = store => getSystemReducer(store).bodies;
export const getSteps = store => getSystemReducer(store).steps;
export const getStepSize = store => getSystemReducer(store).stepSize;

export const getLoggerReducer = store => store.loggerReducer;
export const getLogs = store => getLoggerReducer(store).logs;
