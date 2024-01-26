import { Link } from "react-router-dom";
import logo from "../images/Logo3.png";

function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Groove Grid" />
      </Link>
      <Link to="/genre">Genre</Link>
      <Link to="/artists">Artists</Link>
      <Link to="/aboutus">About Us</Link>
      <div>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
