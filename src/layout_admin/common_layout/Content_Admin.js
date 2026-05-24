import { Routes, Route  } from "react-router-dom";
import React, { useState } from 'react';
import AdminDashboard from "../../pages/AdminDashboard";
import About from "../../pages/About";
import UserManagement from "../user_management/UserManagementLayout";
import MajorManagement from "../major_management/MajorManagementLayout";
import StudentManagement from "../student_management/StudentManagementLayout";
import InstructorManagement from "../instructor_management/InstructorManagementLayout";
import AdmissionPeriodManagement from "../admission_period_management/AdmissionPeriodManagementLayout";
import PeriodAssignmentManagement from "../period_assignment_management/PeriodAssignmentManagementLayout";
import AssignmentRegisterManagement from "../assignment_student_register_management/AssignmentRegisterManagementLayout";
import StudentMapInstructorManagement from "../student_map_instructor/StudentMapInstructorManagementLayout";
import NavbarAdmin from "./Navbar_Admin";
import AdminLogin from "../../layout_login/admin_layout/AdminLoginTemplate";
import Dashboard from "../dashboard_management/DashboardUI";
import ScoreAssignmentManagement from "../score_assignment_management/ScoreAssignmentManagementLayout";
import FileUploadAssignmentManagement from "../file_upload_assignment_management/FileUploadAssignmentManagementLayout";
function Content() {
  return (
    <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <NavbarAdmin />
          <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
      {/* <!-- Start main --> */}
      <main>
        {/* Handle routing for different admin pages */}
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/about" element={<About />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/major-management" element={<MajorManagement />} />
        <Route path="/admin/student-management" element={<StudentManagement />} />
        <Route path="/admin/instructor-management" element={<InstructorManagement />} />
        <Route path="/admin/admission-period-management" element={<AdmissionPeriodManagement />} />
        <Route path="/admin/period-assignment-management" element={<PeriodAssignmentManagement />} />
        <Route path="/admin/assignment-register-management" element={<AssignmentRegisterManagement />} />
        <Route path="/admin/student-map-instructor-management" element={<StudentMapInstructorManagement />} />
        <Route path="/admin/score-assignment-management" element={<ScoreAssignmentManagement />} />
        <Route path="/admin/file-upload-assignment-management" element={<FileUploadAssignmentManagement />} />
      </Routes>
      </main>
      </div>
    </div>
  );
}

export default Content;