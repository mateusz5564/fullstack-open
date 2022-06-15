import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
  },
});
