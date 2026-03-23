import { useLocation, useNavigate } from "react-router-dom";

function AdminLoginTemplate() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Example: set sessionStorage after successful login
    sessionStorage.setItem("attribute1", "admin-session");

    // Redirect to the saved URL after login success
    const redirectUrl = location.state?.urlAfterLoginSuccess || "/admin/dashboard";
    console.log("Redirecting to:", redirectUrl);
    navigate(redirectUrl);
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <button onClick={handleLogin}>Login as Admin</button>
    </div>
  );
}

export default AdminLoginTemplate;