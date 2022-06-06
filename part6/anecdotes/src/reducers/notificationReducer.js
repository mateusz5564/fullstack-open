import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: "Hello in the anecdotes app!", timeoutID: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state) {
      return { text: null, timeoutID: null };
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (text, time) => {
  return (dispatch, getState) => {
    const lastTimeoutID = getState().notification.timeoutID;
    if (lastTimeoutID) {
      clearTimeout(lastTimeoutID);
    }
    const newTimeoutID = setTimeout(() => dispatch(removeNotification()), time * 1000);
    dispatch(createNotification({ text, timeoutID: newTimeoutID }));
  };
};

export default notificationSlice.reducer;
