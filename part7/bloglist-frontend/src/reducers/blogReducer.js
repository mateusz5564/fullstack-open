import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationReducer";

const initialState = [];

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const blog = state.find(blog => blog.id === action.payload.id);
      blog.comments.push(action.payload.content);
    },
    addOne: (state, action) => {
      state.push(action.payload);
    },
    deleteOne: (state, action) => state.filter(blog => blog.id !== action.payload.id),
    likeOne: (state, action) => {
      const blogIndex = state.findIndex(blog => blog.id === action.payload.id);
      state[blogIndex].likes = action.payload.likes;
    },
    setAll: (state, action) => action.payload,
  },
});

export const { addComment, addOne, deleteOne, likeOne, setAll } = blogReducer.actions;

export const addNewComment = (id, content) => async dispatch => {
  const newComment = await blogService.addComment(id, content);
  dispatch(addComment({ id, content: newComment }));
};

export const createBlog = blog => async dispatch => {
  const newBlog = await blogService.create(blog);
  dispatch(addOne(newBlog));
  dispatch(showNotification("success", `a new blog ${newBlog.title} by ${newBlog.author} added`));
};

export const deleteBlog = blog => async dispatch => {
  await blogService.remove(blog.id);
  dispatch(deleteOne(blog));
};

export const getAllBlogs = () => async dispatch => {
  blogService.getAll().then(blogs => dispatch(setAll(blogs)));
};

export const likeBlog = blog => async dispatch => {
  const updatedBlog = await blogService.update(blog);
  dispatch(showNotification("success", `you liked ${updatedBlog.title} by ${updatedBlog.author}`));
  dispatch(likeOne(updatedBlog));
};

export default blogReducer.reducer;
