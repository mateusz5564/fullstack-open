import LoggedUser from "./LoggedUser";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__menu">
        <li className="nav__item">
          <Link to="/">blogs</Link>
        </li>
        <li className="nav__item">
          <Link to="/users">users</Link>
        </li>
      </ul>
      <LoggedUser />
    </nav>
  );
};

export default Nav;
