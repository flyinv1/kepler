
export const getSystemReducer = store => store.systemReducer;
export const getBodies = store => getSystemReducer(store).bodies;
export const getSteps = store => getSystemReducer(store).steps;
export const getStepSize = store => getSystemReducer(store).stepSize;

export const getLoggerReducer = store => store.loggerReducer;
export const getLogs = store => getLoggerReducer(store).logs;

export const getSavedReducer = store => store.savedReducer;
export const getSavedBodies = store => getSavedReducer(store).savedBodies;

export const getResultsReducer = store => store.resultsReducer;
export const getHistory = store => getResultsReducer(store).history;
export const getMaxRadius = store =>  getResultsReducer(store).maxRadius;
export const getFormattedHistory = store => {
    // Return array containing arrays of the form [[r1 r2 r3], [r1, r2, r3], ..., [[r1, r2, r3]] for each body in the system
    var history = getHistory(store);
    var animatable = [];
    history.map((snapshot, j) => {
        snapshot.map((body, i) => {
            if (!animatable[i]) {
                animatable.push([]);
            }
            animatable[i].push(body.slice(0,3));
        })
    });
    return animatable;
};
