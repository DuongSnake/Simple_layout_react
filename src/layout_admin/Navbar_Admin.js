import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ background: "#ddd", padding: "10px" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;