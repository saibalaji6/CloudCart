import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      toast.warning("Please fill all fields");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/reset-password", {
        token: token,
        newPassword: passwords.newPassword,
      });

      toast.success("Password reset successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Password reset failed or link expired");
    }
  };

  return (
    <div className="auth-page">
      <h1>Reset Password</h1>

      <div className="password-field">
        <input
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="password-field">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button onClick={handleResetPassword}>Reset Password</button>

      <p>
        Back to <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default ResetPassword;