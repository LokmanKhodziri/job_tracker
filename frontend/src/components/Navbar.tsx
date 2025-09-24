import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

interface NavbarProps {
  auth: {
    token: string;
  };
  logout: () => void;
}

const Navbar = ({ auth, logout }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      {auth.token ? (
        <h1 className="navbar-brand-disabled">Job Tracker</h1>
      ) : (
        <Link to="/">
          <h1>Job Tracker</h1>
        </Link>
      )}
      <ul>
        {auth.token ? (
          <>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/applications'>Applications</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
