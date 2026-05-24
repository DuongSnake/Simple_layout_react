import { BrowserRouter as Router, Navigate, useLocation } from "react-router-dom";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";

import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import Footer from "./layout/Footer";

import HeaderUser from "./layout_user/common_layout/Header_User";
import NavbarUser from "./layout_user/common_layout/Navbar_User";
import ContentUser from "./layout_user/common_layout/Content_User";
import FooterUser from "./layout_user/common_layout/Footer_User";
import { ACCESS_TOKEN, USER_NAME, PAGE_LOGIN } from './config/constant/Constants';

import LayoutAdmin from "./layout_admin/common_layout/LayoutAdmin";
import LayoutUser from "./layout_user/common_layout/Layout_User";
import LayoutInstructor from "./layout_instructor/common_layout/Layout_Instructor";
import AdminLogin from "./layout_login/admin_layout/AdminLoginTemplate";
import UserLogin from "./layout_login/user_layout/UserLoginTemplate";
import InstructorLogin from "./layout_login/instructor_layout/InstructorLoginTemplate";

import AdminResetPassword from "./layout_login/admin_layout/AdminResetPasswordTemplate";


function LayoutSelector({ children }) {
  const location = useLocation();
  const attribute1 = sessionStorage.getItem(ACCESS_TOKEN);

  // Admin routes
  if (location.pathname.startsWith("/admin")) {
    // render standalone login template (without admin wrapper)
    if (location.pathname === "/admin/login") {
      // && "admin" == sessionStorage.getItem(PAGE_LOGIN) them cai nay cho phan loc
      if (attribute1) {
        return <Navigate to="/admin/dashboard" replace />;
      }
      return <AdminLogin />;
    }
    if (location.pathname === "/admin/forgot-password") {
      return <AdminResetPassword />;
    }

    // protect all other admin pages
    if (!attribute1) {
      return (
        <Navigate
          to="/admin/login"
          state={{ urlAfterLoginSuccess: location.pathname }}
          replace
        />
      );
    }

    // authenticated admin layout
    return <LayoutAdmin>{children}</LayoutAdmin>;
  }

  // User layout
  else if (location.pathname.startsWith("/user")) {
    // render standalone login template (without admin wrapper)
    if (location.pathname === "/user/login") {
      //  && "user" == sessionStorage.getItem(PAGE_LOGIN) them cai nay cho phan loc
      if (attribute1) {
        return <Navigate to="/user/home" replace />;
      }
      return <UserLogin />;
    }

    // protect all other user pages
    if (!attribute1) {
      return (
        <Navigate
          to="/user/login"
          state={{ urlAfterLoginSuccess: location.pathname }}
          replace
        />
      );
    }

    return <LayoutUser>{children}</LayoutUser>;
  }

  // Guest layout
  else if (location.pathname.startsWith("/instructor")) {
    // render standalone login template (without admin wrapper)
    if (location.pathname === "/instructor/login") {
      //  && "instructor" == sessionStorage.getItem(PAGE_LOGIN) them cai nay cho phan loc
      if (attribute1) {
        return <Navigate to="/instructor/home" replace />;
      }
      return <InstructorLogin />;
    }

    // protect all other instructor pages
    if (!attribute1) {
      return (
        <Navigate
          to="/instructor/login"
          state={{ urlAfterLoginSuccess: location.pathname }}
          replace
        />
      );
    }
    return <LayoutInstructor>{children}</LayoutInstructor>;
  }

  // Default layout
  else {
    return (
      <>
        <Header />
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </>
    );
  }
}


function App() {
  return (
    <Router>
      <LayoutSelector>
      </LayoutSelector>
    </Router>
  );
}

export default App;