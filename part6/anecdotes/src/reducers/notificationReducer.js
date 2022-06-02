import { createSlice } from "@reduxjs/toolkit";

const initialState = "Hello in the anecdotes app!"

const notificationSlice = createSlice({
  name: "notification",
  initialState
})

export default notificationSlice.reducer;