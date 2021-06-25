import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("authedUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("authedUser");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
