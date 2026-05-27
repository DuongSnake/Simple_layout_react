import { useNavigate } from "react-router-dom";
import { useState } from "react";
function NavbarInstructor() {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleDropdown = (controlId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [controlId]: !prev[controlId]
    }));
  };

    const navigatePage = () => {
    navigate("/instructor/assignment-register-management", { replace: true });
  };

    const navigatePage1 = () => {
    navigate("/instructor/student-map-instructor", { replace: true });
  };

    const navigatePage2 = () => {
    navigate("/instructor/assignment-request-approve", { replace: true });
  };

    const navigatePage3 = () => {
    navigate("/instructor/assignment-waiting-final-approve", { replace: true });
  };

    const navigatePage4 = () => {
    navigate("/instructor/assignment-waiting-final-approve", { replace: true });
  };
  return (
<>
    {/* // <!-- Start sidebar --> */}
    <aside id="sidebar"
      className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
      aria-label="Sidebar">
      <div
        className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <ul className="pb-2 space-y-2">
              <li>
                <button type="button"
                  onClick={() => toggleDropdown("dropdown-crud")}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  aria-controls="dropdown-crud" 
                  aria-expanded={expandedMenus["dropdown-crud"] ? "true" : "false"}>
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd"
                      d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z">
                    </path>
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">Thông tin đề tài</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
                <ul id="dropdown-crud" className={`space-y-2 py-2 ${!expandedMenus["dropdown-crud"] ? "hidden" : ""}`}>
                  <li onClick={navigatePage1}>
                    <a href="/instructor/student-map-instructor"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700">Sinh viên map giảng viên</a>
                  </li>
                  <li onClick={navigatePage}>
                    <a href="/instructor/assignment-register-management"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700">Đăng ký đồ án sinh viên</a>
                  </li>
                  <li onClick={navigatePage2}>
                    <a href="/instructor/assignment-request-approve"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700">Duyệt đồ án sinh viên</a>
                  </li>
                </ul>
              </li>
              <li>
              <button type="button"
                  onClick={() => toggleDropdown("dropdown-after-exam")}
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  aria-controls="dropdown-after-exam" 
                  aria-expanded={expandedMenus["dropdown-after-exam"] ? "true" : "false"}>
                <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">Thông tin phản biện</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
                <ul id="dropdown-after-exam" className={`space-y-2 py-2 ${!expandedMenus["dropdown-after-exam"] ? "hidden" : ""}`}>
                  <li onClick={navigatePage3}>
                    <a href="/instructor/assignment-waiting-final-approve1232"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700">Danh sách sinh viên đăng ký phản biện</a>
                  </li>
                  <li onClick={navigatePage4}>
                    <a href="/instructor/assignment-waiting-final-approve"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700">Danh sách phê duyệt bảo vệ</a>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </aside>
    {/* //<!-- End sidebar --> */}
        <div className="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90" id="sidebarBackdrop"></div>
</>
  );
}

export default NavbarInstructor;