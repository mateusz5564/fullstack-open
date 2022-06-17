import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAll: (state, action) => action.payload,
  },
});

export const { setAll } = userSlice.actions;

export const getAllUsers = () => async dispatch => {
  userService.getAll().then(users => {
    dispatch(setAll(users));
  });
};

export default userSlice.reducer;
