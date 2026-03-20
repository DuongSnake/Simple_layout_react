import { Routes, Route  } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
function ContentUser() {
  return (
    <main style={{ padding: "20px" }}>
        {/* Hien thi giao dien o day */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default ContentUser;