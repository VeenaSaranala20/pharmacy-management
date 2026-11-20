
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const favorites = useSelector(
    state => state.favorites
  );

  return (
    <nav className="navbar">

      <Link to="/" className="nav-logo">
        💊 PharmaCare
      </Link>

      <div className="nav-links">

        {user ? (
          <>
            <Link to="/">Dashboard</Link>

            <Link to="/medicines">
              Medicines
            </Link>

            <Link to="/favorites" className="favorite-nav">
              ♥ Favorites
              <span className="nav-fav-count">
                {favorites.length}
              </span>
            </Link>

            <span className="nav-user">
              Hi, {user.name}
            </span>

            <Link to="/logout" className="logout-btn">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
