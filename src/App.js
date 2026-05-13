import { BrowserRouter as Router, Navigate, useLocation } from "react-router-dom";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";

import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import Footer from "./layout/Footer";

import HeaderUser from "./layout_user/Header_User";
import NavbarUser from "./layout_user/Navbar_User";
import ContentUser from "./layout_user/Content_User";
import FooterUser from "./layout_user/Footer_User";
import { ACCESS_TOKEN, USER_NAME } from './config/constant/Constants';

import LayoutAdmin from "./layout_admin/common_layout/LayoutAdmin";
import AdminLogin from "./layout_login/admin_layout/AdminLoginTemplate";

function LayoutSelector({ children }) {
  const location = useLocation();
  const attribute1 = sessionStorage.getItem(ACCESS_TOKEN);

  // Admin routes
  if (location.pathname.startsWith("/admin")) {
    // render standalone login template (without admin wrapper)
    if (location.pathname === "/admin/login") {
      if (attribute1) {
        return <Navigate to="/admin/dashboard" replace />;
      }
      return <AdminLogin />;
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
    if (!attribute1) {
      return (
        <Navigate
          to="/user/login"
          state={{ urlAfterLoginSuccess: location.pathname }}
          replace
        />
      );
    }
    return (
      <>
        <HeaderUser />
        <NavbarUser />
        <ContentUser>{children}</ContentUser>
        <FooterUser />
      </>
    );
  }

  // Guest layout
  else if (location.pathname.startsWith("/guest")) {
    if (!attribute1) {
      return (
        <Navigate
          to="/guest/login"
          state={{ urlAfterLoginSuccess: location.pathname }}
          replace
        />
      );
    }
    return (
      <>
        <Header />
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </>
    );
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