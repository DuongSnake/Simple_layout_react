import { Link } from "react-router-dom";

function NavbarUser() {
  return (
    <nav style={{ background: "#ddd", padding: "10px" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
        <li><Link to="/user">Home User</Link></li>
        <li><Link to="/user/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarUser;