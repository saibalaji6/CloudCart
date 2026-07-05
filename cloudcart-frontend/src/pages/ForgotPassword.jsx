import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warning("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
  await api.post("/api/auth/forgot-password", {
    email: email,
  });

  toast.success("Password reset link sent to your email.");
} catch (error) {
  console.error(error);
  toast.error("Failed to send reset link.");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="auth-page">
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleForgotPassword}
        disabled={loading}
      >
        {loading ? "Sending Link..." : "Send Reset Link"}
      </button>

      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;