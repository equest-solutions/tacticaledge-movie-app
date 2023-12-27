import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      token: null,
      userId: null,
   },
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