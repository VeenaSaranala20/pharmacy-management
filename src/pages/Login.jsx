
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.get("/users", {
        params: {
          email: email.trim().toLowerCase()
        }
      });

      const user = response.data.find(
        item => item.password === password
      );

      if (user) {
        const loggedInUser = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        alert("Login successful!");

        navigate("/", { replace: true });
        window.location.reload();

      } else {
        setError("Invalid email or password!");
      }

    } catch (error) {
      console.error(error);
      setError("Unable to login. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">💊</div>

        <h1>Welcome Back!</h1>
        <p>Login to your Pharmacy Management account</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
