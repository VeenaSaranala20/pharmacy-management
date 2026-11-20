
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const email = user.email.trim().toLowerCase();

      const response = await api.get("/users", {
        params: { email }
      });

      if (response.data.length > 0) {
        setError("Email already registered!");
        return;
      }

      await api.post("/users", {
        name: user.name.trim(),
        email,
        password: user.password
      });

      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">💊</div>

        <h1>Create Account</h1>
        <p>Join Pharmacy Management today</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={user.password}
            onChange={handleChange}
            minLength="6"
            required
          />

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
