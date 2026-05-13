import { Routes, Route  } from "react-router-dom";
import React, { useState } from 'react';
import AdminDashboard from "../../pages/AdminDashboard";
import About from "../../pages/About";
import UserManagement from "../user_management/UserManagementLayout";
import MajorManagement from "../major_management/MajorManagementLayout";
import NavbarAdmin from "./Navbar_Admin";
import AdminLogin from "../../layout_login/admin_layout/AdminLoginTemplate";
function Content() {
  return (
    <div class="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
      <NavbarAdmin />
          <div id="main-content" class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
      {/* <!-- Start main --> */}
      <main>
        {/* Handle routing for different admin pages */}
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/about" element={<About />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/major-management" element={<MajorManagement />} />
      </Routes>
      </main>
      </div>
    </div>
  );
}

export default Content;