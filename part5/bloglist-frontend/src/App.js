import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleNewBlog = async e => {
    e.preventDefault();
    const newBlog = await blogService.create({ title, author, url });
    console.log(newBlog)
    console.log(blogs)
    setBlogs(blogs.concat(newBlog));
  };

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            <label>
              title:
              <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
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
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogsList()}
    </>
  );
};

export default App;
