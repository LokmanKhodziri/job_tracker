import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ auth, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <h1>Job Tracker</h1>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/applications">Applications</Link>
        </li>
        {auth.token ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
