import { createSlice } from "@reduxjs/toolkit";

const initialState = "Hello in the anecdotes app!";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state) {
      return null;
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(createNotification(content));
    setTimeout(() => dispatch(removeNotification()), time * 1000);
  };
};

export default notificationSlice.reducer;
