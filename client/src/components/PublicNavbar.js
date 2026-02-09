import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthModal from "./AuthModal";   // ⭐ ADD
import "../styles/navbar.css";

function PublicNavbar() {

  const [showModal, setShowModal] = useState(false);   // ⭐ ADD

  return (
    <>
      <nav className="public-navbar">

        {/* Logo */}
        <NavLink to="/" className="nav-logo">
          InvoiceAI
        </NavLink>

        {/* Navigation Links */}
        <div className="nav-links">

          <NavLink to="/about" className="nav-item">
            About
          </NavLink>

          <NavLink to="/features" className="nav-item">
            Features
          </NavLink>

          <NavLink to="/contact" className="nav-item">
            Contact
          </NavLink>

        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">

          {/* ⭐ REPLACED ROUTE WITH MODAL */}
          <button
            className="login-btn"
            onClick={() => setShowModal(true)}
          >
            Login
          </button>

          {/* ⭐ SAME MODAL FOR SIGNUP */}
          <button
            className="signup-btn"
            onClick={() => setShowModal(true)}
          >
            Sign Up
          </button>

        </div>

      </nav>

      {/* ⭐ ADD MODAL BELOW NAVBAR */}
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

export default PublicNavbar;
