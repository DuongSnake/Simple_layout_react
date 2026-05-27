import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, USER_NAME, PAGE_LOGIN } from '../../config/constant/Constants';
import { authenticate } from "../admin_layout/AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";

function InstructorLoginTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, changePassword: changePasswordState } = useSelector(state => state.authentication);

  const handleLogin = async () => {
    try {
      const response = await dispatch(authenticate({ userName: "vjlmmldads@gmail.com", password: "ktx2024" }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        // Store token and user info
        if (response.payload.data != null && response.payload.data.token) {
          sessionStorage.setItem(ACCESS_TOKEN, response.payload.data.token);
          sessionStorage.setItem(PAGE_LOGIN, "instructor");
          sessionStorage.setItem(USER_NAME, response.payload.data.username);
        }
        // Redirect to dashboard
        const redirectUrl = location.state?.urlAfterLoginSuccess || "/instructor/profile";
        navigate(redirectUrl);
      } else {
        console.error("Login failed:", response.payload);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Instructor Login</h2>
      <button onClick={handleLogin} disabled={login.loading}>
        {login.loading ? "Logging in..." : "Login as Instructor"}
      </button>
    </div>
  );
}
export default InstructorLoginTemplate;