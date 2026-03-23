import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";

import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Content from "./layout/Content";
import Footer from "./layout/Footer";

import HeaderUser from "./layout_user/Header_User";
import NavbarUser from "./layout_user/Navbar_User";
import ContentUser from "./layout_user/Content_User";
import FooterUser from "./layout_user/Footer_User";

import HeaderAdmin from "./layout_admin/Header_Admin";
import NavbarAdmin from "./layout_admin/Navbar_Admin";
import ContentAdmin from "./layout_admin/Content_Admin";
import FooterAdmin from "./layout_admin/Footer_Admin";

function LayoutSelector({ children }) {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) {
    return (
      <>
        <HeaderAdmin />
        <NavbarAdmin />
        <ContentAdmin>{children}</ContentAdmin>
        <FooterAdmin />
      </>
    );
  } else if (location.pathname.startsWith("/user")) {
    return (
      <>
        <HeaderUser />
        <NavbarUser />
        <ContentUser>{children}</ContentUser>
        <FooterUser />
      </>
    );
  } else {
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