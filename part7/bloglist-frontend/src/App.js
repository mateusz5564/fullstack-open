import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setNotification } from "./reducers/notificationReducer";
import { addBlog, deleteBlog, likeBlog, setBlogs } from "./reducers/blogReducer";
import { login, logout } from "./reducers/authReducer";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Users from "./views/Users";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const user = useSelector(state => state.auth);
  const blogs = useSelector(state => state.blogs);
  const notification = useSelector(state => state.notification);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const newBlogToggleBtnRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      dispatch(login(user));
    }
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const showNotification = (type, message) => {
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

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(login(user));
      setUsername("");
      setPassword("");
    } catch (err) {
      showNotification("error", "invalid username or password");
      console.error("login error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(logout());
  };

  const createBlog = async blog => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
    showNotification("success", `a new blog ${newBlog.title} by ${newBlog.author} added`);
    newBlogToggleBtnRef.current.toggleVisibility();
  };

  const handleLikeBlog = async blog => {
    const updatedBlog = await blogService.update(blog);
    showNotification("success", `you liked ${updatedBlog.title} by ${updatedBlog.author}`);
    dispatch(likeBlog(updatedBlog));
  };

  const handleDeleteBlog = async blog => {
    console.log(blog);
    await blogService.remove(blog.id);
    dispatch(deleteBlog(blog));
  };

  const blogsList = () => {
    return (
      <div id="blogs-list">
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeBlog={handleLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        ))}
      </div>
    );
  };

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        notification={notification}
      />
    );
  }

  return (
    <>
      <h1>Blogs</h1>
      {notification && <Notification type={notification.type}>{notification.message}</Notification>}
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Toggable ref={newBlogToggleBtnRef} label="new blog">
                <BlogForm createBlog={createBlog} />
              </Toggable>
              {blogsList()}
            </>
          }
        />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
