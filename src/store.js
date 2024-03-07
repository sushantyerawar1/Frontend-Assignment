import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    selectedField: 30,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_FIELD':
            return { ...state, selectedField: action.payload };
        default:
            return state;
    }
};

const store = configureStore({
    reducer: reducer,
});

export default store;