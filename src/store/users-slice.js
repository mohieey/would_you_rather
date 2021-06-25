import { createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../_DATA";

const usersSlice = createSlice({
  name: "users",
  initialState: { users: {} },
  reducers: {
    populateUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;

export const fetchUsers = () => {
  return (dispatch) => {
    _getUsers().then((users) => dispatch(usersActions.populateUsers(users)));
  };
};

export default usersSlice;
