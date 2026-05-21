import HeaderInstructor from "./Header_Instructor";
import ContentInstructor from "./Content_Instructor";
import FooterInstructor from "./Footer_Instructor";

function LayoutInstructor({ children }) {
  return (
    <>
      <HeaderInstructor />
      <ContentInstructor>{children}</ContentInstructor>
    </>
  );
}

export default LayoutInstructor;
