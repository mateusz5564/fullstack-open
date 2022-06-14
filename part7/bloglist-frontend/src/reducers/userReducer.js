import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => action.payload,
    logout: () => null,
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
