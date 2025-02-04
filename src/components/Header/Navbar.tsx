import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../slices/authSlice";
import "./header.css";

const Navbar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  // Get authentication state from Redux
  const authToken = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!authToken; // Convert token to boolean

  useEffect(() => {
    const fixedNavbar = () => {
      setShow(window.scrollY >= 45);
    };

    window.addEventListener("scroll", fixedNavbar);
    return () => window.removeEventListener("scroll", fixedNavbar);
  }, []);

  useEffect(() => {
    // Redirect to login only when user logs out
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated, history]);

  // Handle Logout
  const handleLogout = () => {
    // Remove token from Redux
    dispatch(logout());

    // Remove token from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Redux will update state, triggering the useEffect above to navigate to /login
  };

  return (
    <section className="myNavBar">
      <nav
        className={`navbar ${show ? "fixed-top navbarbg" : ""} navbar-expand-lg navbar-light`}
        id="fixedNavbar"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            CapstoneHNB
          </Link>

          {isAuthenticated && (
            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
