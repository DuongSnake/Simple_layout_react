import HeaderAdmin from "./Header_Admin";
import ContentAdmin from "./Content_Admin";
import FooterAdmin from "./Footer_Admin";

function LayoutAdmin({ children }) {
  return (
    <>
      <HeaderAdmin />
      <ContentAdmin>{children}</ContentAdmin>
      <FooterAdmin />
    </>
  );
}

export default LayoutAdmin;
