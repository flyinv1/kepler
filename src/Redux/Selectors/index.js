
export const getSystemReducer = store => store.systemReducer;
export const getBodies = store => getSystemReducer(store).bodies;