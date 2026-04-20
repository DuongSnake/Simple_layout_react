import HeaderAdmin from "./Header_Admin";
import NavbarAdmin from "./Navbar_Admin";
import ContentAdmin from "./Content_Admin";
import FooterAdmin from "./Footer_Admin";

function LayoutAdmin({ children }) {
  return (
    <>
      <HeaderAdmin />
      <NavbarAdmin />
      {/* <ContentAdmin>{children}</ContentAdmin> */}
      <FooterAdmin />
    </>
  );
}

export default LayoutAdmin;
