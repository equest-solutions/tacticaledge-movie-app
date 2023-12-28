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
   totalPages: 1,
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
         if(Number(payload.page) === state.totalPages) state.isModified = false;
      },
      setActivePage(state, { payload }) {
         state.activePage = payload;
      },
      setTotalPages(state, { payload }) {
         state.totalPages = payload;
      },
      setModified(state, {payload}) {
         state.isModified = payload;
      },
      deleteMovies(state) {
         state.moviesList = null;
      }
   },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
