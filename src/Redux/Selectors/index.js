
export const getSystemReducer = store => store.systemReducer;
export const getCentralBody = store => getSystemReducer(store).centerBody;
export const getBodies = store => getSystemReducer(store).bodies;