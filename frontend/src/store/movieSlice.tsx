import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieStore } from '../typescript/interfaces/global';

interface InitialState {
   moviesList: any;
   totalPages: number;
   activePage: number;
   isModified: boolean;
}

const initialState: InitialState = {
   moviesList: null,
   totalPages: 0,
   activePage: 1,
   isModified: false,
};

const movieSlice = createSlice({
   name: 'movie',
   initialState,
   reducers: {
      setMoviesList(state, { payload }: PayloadAction<MovieStore>) {
         if (!state.moviesList) {
            state.moviesList = {};
         }
         (state.moviesList as any)[payload.page] = payload.list;
         state.isModified = false;
      },
      setActivePage(state, { payload }) {
         state.activePage = payload;
      },
      setModified(state, {payload}) {
         state.isModified = payload;
      }
   },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
