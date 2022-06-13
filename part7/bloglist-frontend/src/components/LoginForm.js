import Notification from "./Notification";
import { useSelector } from "react-redux/es/exports";

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  const notification = useSelector(state => state.notification);

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

export default LoginForm;
