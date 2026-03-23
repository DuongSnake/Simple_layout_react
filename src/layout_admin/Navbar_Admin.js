import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("attribute1");
    navigate("/admin/login", { replace: true });
  };

  return (
    <nav style={{ background: "#ddd", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "10px", margin: 0, padding: 0 }}>
        <li><Link to="/admin">Home</Link></li>
        <li><Link to="/admin/about">About</Link></li>
      </ul>
      <button onClick={handleLogout} style={{ padding: "6px 12px" }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;