import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
   token: null | string,
   userId: null | string,
}

const initialState: InitialState = {
   token: null,
   userId: null,
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
      },
   }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;