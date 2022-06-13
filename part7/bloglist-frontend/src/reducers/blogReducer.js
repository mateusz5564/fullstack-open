import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => (state = action.payload),
  },
});

export const { addBlog, setBlogs } = blogReducer.actions;
export default blogReducer.reducer;
