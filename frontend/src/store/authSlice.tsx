import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
   token: null | string,
   userId: null | string,
}

const initialState: InitialState = {
   token: localStorage.getItem('token') || null,
   userId: localStorage.getItem('userId') || null,
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginUser(state, {payload}) {
         state.token = payload.token;
         state.userId = payload.userId;
      },
      logoutUser(state) {
         state.token = null;
         state.userId = null;
         localStorage.removeItem('token');
         localStorage.removeItem('userId');
      },
   }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;