import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import movieSlice from './movieSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    movie: movieSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
