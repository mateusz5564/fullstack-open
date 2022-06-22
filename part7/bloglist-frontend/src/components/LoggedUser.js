import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/authReducer";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const LoggedUser = () => {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {user.username} logged in{" "}
      <Button
        variant="text"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ color: "white", ml: 1 }}
      >
        logout
      </Button>
    </div>
  );
};

export default LoggedUser;
