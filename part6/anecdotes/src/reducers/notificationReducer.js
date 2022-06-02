import { createSlice } from "@reduxjs/toolkit";

const initialState = "Hello in the anecdotes app!";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state) {
      return null;
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
