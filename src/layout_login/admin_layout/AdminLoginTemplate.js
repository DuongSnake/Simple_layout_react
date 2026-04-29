import { useLocation, useNavigate } from "react-router-dom";
import { authenticate, changePassword } from "../admin_layout/AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";
function AdminLoginTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, changePassword: changePasswordState } = useSelector(state => state.authentication);
  
  const handleLogin = async () => {
    try {
      const response = await dispatch(authenticate({ userName: "duong", password: "ktx2024" }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("Login successful:", response.payload);
        // Store token and user info
        if (response.payload.data != null && response.payload.data.token) {
          sessionStorage.setItem("access_token", response.payload.data.token);
        }
        // Redirect to dashboard
        const redirectUrl = location.state?.urlAfterLoginSuccess || "/admin/dashboard";
        navigate(redirectUrl);
      } else {
        console.error("Login failed:", response.payload);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  const handleChangePassword = async () => {
    try {
      const response = await dispatch(changePassword({ userName: "duong", oldPassword: "ktx2024", newPassword: "newpassword" }));
      // Check if password change was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("Password changed successfully:", response.payload);
      } else {
        console.error("Failed to change password:", response.payload);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <button onClick={handleLogin} disabled={login.loading}>
        {login.loading ? "Logging in..." : "Login as Admin"}
      </button>
      <button onClick={handleChangePassword} disabled={changePasswordState.loading}>
        {changePasswordState.loading ? "Changing password..." : "Change Password"}
      </button>
    </div>
  );
}

export default AdminLoginTemplate;