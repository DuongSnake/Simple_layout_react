import { Routes, Route  } from "react-router-dom";
import HomeInstructor from "../../pages/Home_Instructor";
import UserProfile from "../../pages/UserProfile";
import NavbarInstructor from "./Navbar_Instructor";
import InstructorLogin from "../../layout_login/instructor_layout/InstructorLoginTemplate";
import AssignmentRegisterByInstructor from "../assignment_register_by_instructor/AssignmentRegisterByInstructorLayout";
import AssignmentRequestApprove from "../assignment_request_approve/AssignmentRequestApproveLayout";
import StudentMapInstructorManagementInstructorSite from "../student_map_instructor/StudentMapInstructorSiteLayout";
import FileUploadAssignmentProcess from "../file_upload_assignment_process/FileUploadAssignmentProcessLayout";
import AssignmentWaitingFinalApproveLayout from "../assignment_waiting_final_approve/AssignmentWaitingFinalApproveLayout";
import StudentMapCriticalLayout from "../student_map_critical/StudentMapCriticalLayout";
import ScoreAssignmentManagementLayout from "../score_assignment_student/ScoreAssignmentManagementLayout";
function ContentInstructor() {
  return (
      <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <NavbarInstructor />
          <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
      {/* <!-- Start main --> */}
      <main>
        {/* Handle routing for different admin pages */}
      <Routes>
        <Route path="/instructor" element={<HomeInstructor />} />
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/instructor/assignment-register-management" element={<AssignmentRegisterByInstructor />} />
        <Route path="/instructor/assignment-request-approve" element={<AssignmentRequestApprove />} />
        <Route path="/instructor/student-map-instructor" element={<StudentMapInstructorManagementInstructorSite />} />
        <Route path="/instructor/file-upload-assignment-process" element={<FileUploadAssignmentProcess />} />
        <Route path="/instructor/assignment-waiting-final-approve" element={<AssignmentWaitingFinalApproveLayout />} />
        <Route path="/instructor/student-map-critical" element={<StudentMapCriticalLayout />} />
        <Route path="/instructor/score-assignment-management" element={<ScoreAssignmentManagementLayout />} />
      </Routes>
      </main>
      </div>
    </div>
  );
}

export default ContentInstructor;