import React from 'react';
import { createStore, combineReducers } from 'redux';
import reducers from '../Reducers/index.js';

export const store = createStore(
    combineReducers({
        state: reducers
    })
);