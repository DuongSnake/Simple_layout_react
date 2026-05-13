import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#ddd", padding: "10px" }}>
      <h3>Thong tin menu ban thuong(khong phai admin hay user)</h3>
      <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
        <li><Link to="/guest">Landing Page</Link></li>
        <li><Link to="/guest/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;