import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
   name: 'movie',
   initialState: {
      moviesList: null,
      totalPages: 0,
   },
   reducers: {
      setMoviesList(state, {payload}) {

      }
   }
})

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
