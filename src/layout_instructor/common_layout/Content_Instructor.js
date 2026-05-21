import { Routes, Route  } from "react-router-dom";
import HomeInstructor from "../../pages/Home_Instructor";
import UserProfile from "../../pages/UserProfile";
import InstructorLogin from "../../layout_login/instructor_layout/InstructorLoginTemplate";
function ContentInstructor() {
  return (
    <main style={{ padding: "20px" }}>
        {/* Phan noi dung hien thi trong instructor layout */}
      <Routes>
        <Route path="/instructor" element={<HomeInstructor />} />
        <Route path="/instructor/login" element={<InstructorLogin />} />
      </Routes>
    </main>
  );
}

export default ContentInstructor;