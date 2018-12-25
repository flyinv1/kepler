import { TEST } from './constants';

export const addItem = item => ({
    type: TEST,
    payload: {
        label: item
    }
});