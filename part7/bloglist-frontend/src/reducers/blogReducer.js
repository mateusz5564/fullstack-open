import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    deleteBlog: (state, action) => state.filter(blog => blog.id !== action.payload.id),
    likeBlog: (state, action) => {
      const blogIndex = state.findIndex(blog => blog.id === action.payload.id);
      state[blogIndex].likes = action.payload.likes;
    },
    setBlogs: (state, action) => action.payload,
  },
});

export const { addBlog, deleteBlog, likeBlog, setBlogs } = blogReducer.actions;
export default blogReducer.reducer;
