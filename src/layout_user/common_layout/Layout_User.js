import HeaderUser from "./Header_User";
import ContentUser from "./Content_User";
import FooterUser from "./Footer_User";

function LayoutUser({ children }) {
  return (
    <>
      <HeaderUser />
      <ContentUser>{children}</ContentUser>
    </>
  );
}

export default LayoutUser;
