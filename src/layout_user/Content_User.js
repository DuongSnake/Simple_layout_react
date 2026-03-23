import { Routes, Route  } from "react-router-dom";
import HomeUser from "../pages/Home_User";
import UserProfile from "../pages/UserProfile";
import UserLogin from "../layout_login/UserLoginTemplate";
function ContentUser() {
  return (
    <main style={{ padding: "20px" }}>
        {/* Phan noi dung hien thi trong user layout */}
      <Routes>
        <Route path="/user" element={<HomeUser />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/login" element={<UserLogin />} />
      </Routes>
    </main>
  );
}

export default ContentUser;