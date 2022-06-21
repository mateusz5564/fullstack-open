import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";

const LoggedUser = () => {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {user.username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LoggedUser;
