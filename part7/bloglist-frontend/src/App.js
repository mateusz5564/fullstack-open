import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { logout, setLoggedUser } from "./reducers/authReducer";
import Blogs from "./views/Blogs";
import Login from "./views/Login";
import Users from "./views/Users";
import Notification from "./components/Notification";

const App = () => {
  const user = useSelector(state => state.auth);
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoggedUser());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (user === null) {
    return <Login />;
  }

  return (
    <>
      <h1>Blogs</h1>
      {notification && <Notification type={notification.type}>{notification.message}</Notification>}
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
