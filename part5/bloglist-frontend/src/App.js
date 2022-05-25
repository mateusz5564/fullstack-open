import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const newBlogToggleBtnRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      showNotification("error", "invalid username or password");
      console.error("login error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        {notification && (
          <Notification type={notification.type}>{notification.message}</Notification>
        )}
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  const createBlog = async blog => {
    const newBlog = await blogService.create(blog);
    setBlogs(blogs.concat(newBlog));
    showNotification("success", `a new blog ${newBlog.title} by ${newBlog.author} added`);
    newBlogToggleBtnRef.current.toggleVisibility();
  };

  const blogsList = () => {
    return (
      <div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  if (user === null) {
    return loginForm();
  }

  return (
    <>
      <h1>Blogs</h1>
      {notification && <Notification type={notification.type}>{notification.message}</Notification>}
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggable ref={newBlogToggleBtnRef} label="new blog">
        <BlogForm createBlog={createBlog} />
      </Toggable>
      {blogsList()}
    </>
  );
};

export default App;
