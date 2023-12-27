import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { MovieStore } from '../typescript/interfaces/global';

interface InitialState {
   moviesList: any;
   totalPages: number;
}

const initialState: InitialState = {
   moviesList: null,
   totalPages: 0,
}

const movieSlice = createSlice({
   name: 'movie',
   initialState,
   reducers: {
      setMoviesList(state, { payload }: PayloadAction<MovieStore>) {
         if(!state.moviesList) {
            state.moviesList = {};
         } else (state.moviesList as any)[payload.page] = payload.list
      },
   },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
