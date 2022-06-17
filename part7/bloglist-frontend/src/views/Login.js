import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/authReducer";
import { showNotification } from "../reducers/notificationReducer";
import Notification from "../components/Notification";

const Login = () => {
  const notification = useSelector(state => state.notification);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      dispatch(login(username, password));
      setUsername("");
      setPassword("");
    } catch (err) {
      dispatch(showNotification("error", "invalid username or password"));
      console.error("login error");
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      {notification && <Notification type={notification.type}>{notification.message}</Notification>}
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              id="username"
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
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
