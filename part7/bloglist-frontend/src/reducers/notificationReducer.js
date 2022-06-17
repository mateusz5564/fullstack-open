import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => (state = action.payload),
  },
});

const { setNotification } = notificationSlice.actions;

export const showNotification = (type, message) => {
  return dispatch => {
    dispatch(
      setNotification({
        type,
        message,
      })
    );
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

export default notificationSlice.reducer;
