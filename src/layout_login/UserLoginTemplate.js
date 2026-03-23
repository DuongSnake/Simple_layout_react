import { useLocation, useNavigate } from "react-router-dom";

function UserLoginTemplate() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    sessionStorage.setItem("attribute1", "user-session");
    const redirectUrl = location.state?.urlAfterLoginSuccess || "/user/profile";
    navigate(redirectUrl);
  };

  return (
    <div>
      <h2>User Login</h2>
      <button onClick={handleLogin}>Login as User</button>
    </div>
  );
}

export default UserLoginTemplate;