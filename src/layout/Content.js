import { Routes, Route  } from "react-router-dom";
import Landing_Page from "../pages/Landing_Page";
import Guest_About from "../pages/Guest_About";
function Content() {
  return (
    <main style={{ padding: "20px" }}>
        {/* Hien thi giao dien o day */}
      <Routes>
        <Route path="/guest" element={<Landing_Page />} />
        <Route path="/guest/about" element={<Guest_About />} />
      </Routes>
    </main>
  );
}

export default Content;