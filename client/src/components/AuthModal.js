import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/authModal.css";

function AuthModal({ isOpen, onClose }) {

  const [mode, setMode] = useState("login"); // login | register

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const url =
        mode === "login"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/auth/register";

      const res = await axios.post(url, formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Success");

      window.location.href = "/dashboard";

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Auth failed"
      );

    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>

          {mode === "register" && (
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          )}

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>

        </form>

        <p>
          {mode === "login"
            ? "Don't have account?"
            : "Already have account?"}

          <span
            className="switch-link"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
          >
            {mode === "login" ? " Register" : " Login"}
          </span>

        </p>

      </div>
    </div>
  );
}

export default AuthModal;
