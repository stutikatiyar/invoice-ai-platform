import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { toast } from "react-toastify";


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (error) {
      toast.error("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

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

          <button type="submit">Register</button>

        </form>
        


      </div>
    </div>
  );
}

export default Register;
