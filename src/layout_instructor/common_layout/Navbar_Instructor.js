import { Link } from "react-router-dom";

function NavbarInstructor() {
  return (
    <nav style={{ background: "#ddd", padding: "10px" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
        <li><Link to="/instructor">Home Instructor</Link></li>
        <li><Link to="/instructor/home">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavbarInstructor;