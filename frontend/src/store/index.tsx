import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
