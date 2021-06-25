import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import usersSlice from "./users-slice";
import questionsSlice from "./questions-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    questions: questionsSlice.reducer,
  },
});

export default store;
