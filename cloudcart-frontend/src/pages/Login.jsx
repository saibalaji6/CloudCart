import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.warning("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
  email: formData.email,
  password: formData.password,
});

      login(response.data);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
      />

      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;