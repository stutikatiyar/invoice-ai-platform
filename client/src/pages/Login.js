import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";
import PublicNavbar from "../components/PublicNavbar";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <>
      <PublicNavbar />

      <div className="auth-container">
        <div className="auth-card">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit">Login</button>

          </form>

          

        </div>
      </div>
    </>
  );
}

export default Login;
