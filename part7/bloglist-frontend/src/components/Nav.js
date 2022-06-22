import LoggedUser from "./LoggedUser";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Nav = () => {
  return (
    <AppBar position="static" sx={{ padding: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack component="ul" direction="row" spacing={2} color="red" sx={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <Button component={Link} to="/" sx={{ color: "white" }}>
              blogs
            </Button>
          </li>
          <li>
            <Button component={Link} to="/users" sx={{ color: "white" }}>
              users
            </Button>
          </li>
        </Stack>
        <LoggedUser />
      </Stack>
    </AppBar>
  );
};

export default Nav;
