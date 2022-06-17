import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { showNotification } from "./reducers/notificationReducer";
import { login, logout } from "./reducers/authReducer";
import loginService from "./services/login";
import Users from "./views/Users";
import Notification from "./components/Notification";
import Blogs from "./views/Blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const user = useSelector(state => state.auth);
  const notification = useSelector(state => state.notification);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      dispatch(login(user));
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(login(user));
      setUsername("");
      setPassword("");
    } catch (err) {
      dispatch(showNotification("error", "invalid username or password"));
      console.error("login error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    dispatch(logout());
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
          element={<Blogs />}
        />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
