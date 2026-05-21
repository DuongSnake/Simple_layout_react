import { Routes, Route  } from "react-router-dom";
import HomeUser from "../../pages/Home_User";
import UserProfile from "../../pages/UserProfile";
import UserLogin from "../../layout_login/user_layout/UserLoginTemplate";
import NavbarUser from "./Navbar_User";
import AssignmentRegisterManagement from "../assignment_student_register_management/AssignmentRegisterManagementLayout";
function ContentUser() {
  return (
    <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <NavbarUser />
          <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
      {/* <!-- Start main --> */}
      <main>
        {/* Handle routing for different admin pages */}
      <Routes>
        <Route path="/user" element={<HomeUser />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/assignment-register" element={<AssignmentRegisterManagement />} />
      </Routes>
      </main>
      </div>
    </div>
  );
}

export default ContentUser;