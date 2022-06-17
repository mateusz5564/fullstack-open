import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth";

const initialState = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => action.payload,
    removeAuth: () => null,
  },
});

const { addAuth, removeAuth } = authSlice.actions;

export const setLoggedUser = () => dispatch => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    dispatch(addAuth(user));
  }
};

export const login = (username, password) => async dispatch => {
  const user = await authService.login({ username, password });
  window.localStorage.setItem("user", JSON.stringify(user));
  dispatch(addAuth(user));
};

export const logout = () => dispatch => {
  window.localStorage.removeItem("user");
  dispatch(removeAuth());
};

export default authSlice.reducer;
