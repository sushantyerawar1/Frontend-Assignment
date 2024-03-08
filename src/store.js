import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    selectedField: 180,
    startTs: null,
    endTs: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_FIELD':
            return { ...state, selectedField: action.payload };
        case 'SET_STARTTS_VALUE':
            return { ...state, startTs: action.payload };
        case 'SET_ENDTS_VALUE':
            return { ...state, endTs: action.payload };
        default:
            return state;
    }
};

const store = configureStore({
    reducer: reducer,
});

export default store;