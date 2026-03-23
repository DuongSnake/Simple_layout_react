import { Routes, Route  } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import About from "../pages/About";
import AdminLogin from "../layout_login/AdminLoginTemplate";
function Content() {
  return (
    <main style={{ padding: "20px" }}>
        {/* Phan noi dung hien thi trong admin layout */}
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default Content;