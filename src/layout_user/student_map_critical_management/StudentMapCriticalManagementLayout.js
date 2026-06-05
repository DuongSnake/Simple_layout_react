import React, { useState, useEffect } from 'react';
import { selectListCriticalByStudentIdApi } from "../../layout_admin/student_map_critical/StudentMapCriticalManagementAPI";
import {findUserIdByUsername} from "../../layout_login/admin_layout/AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";
import { USER_NAME_USER}  from '../../config/constant/Constants';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../.././App.css';

function StudentMapCriticalManagement() {
  const dispatch = useDispatch();
  const listDataStudentMapInstructor = useSelector(state => state.studentMapCriticalManagement.selectListCriticalByStudentId.data);
  const totalRecord = useSelector(state => state.studentMapCriticalManagement.selectListCriticalByStudentId.totalRecord);
  const listDataStudentMapInstructorLoading = useSelector(state => state.studentMapCriticalManagement.selectListCriticalByStudentId.loading);
  const userIdGetFromAccountLogin = useSelector(state => state.authentication.findUserId.data);


  // State for form data (Edit student map instructor modal)
  const [formDataEdit, setFormDataEdit] = useState({
    studentMapInstructorId: '',
    instructorId: '',
    studentId: '',
    studentName: ''
  });

  // State for form data (Search student map instructor modal)
  const [formDataSearch, setFormDataSearch] = useState({
    id: ''
  });

  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });
    //Handle for select list all students API call 
  const handleSelectUserIdGetFromAccountLogin = async () => {
    try {
        const valueUserName = sessionStorage.getItem(USER_NAME_USER);
        const response = await dispatch(findUserIdByUsername({ userName: valueUserName }));
        if (response.type.endsWith('/fulfilled')) {
          let valueInstructorId = response.payload.id;
    //Select list student map instructor when component mounts
    handleSelectListUsers(valueInstructorId);
        } else {
          console.error("select userId failed:", response.payload);
        }
      } catch (error) {
        console.error("select userId error:", error);
      }
    };
  // State for checkbox selection
  const [selectedStudentMapInstructor, setSelectedStudentMapInstructor] = useState(new Set());
  
  const _onChangePagination = (page, pageSize) => {
    // setPager({ ...pager, pageNum: page });
    handleSelectListUsers(userIdGetFromAccountLogin.id);
  };

  // Handler for select all checkbox
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all users in current page
      const allUserIds = new Set(
        listDataStudentMapInstructor?.map((user, idx) => user?.id ?? idx) || []
      );
      setSelectedStudentMapInstructor(allUserIds);
    } else {
      // Deselect all
      setSelectedStudentMapInstructor(new Set());
    }
  };


  // Handler for individual row checkbox
  const handleUserCheckboxChange = (userId) => {
    setSelectedStudentMapInstructor((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
    //Set value for edit form when click checkbox of user
    listDataStudentMapInstructor.forEach(user => {
      if (user.studentMapInstructorId === userId) {
        setFormDataEdit({
          studentMapInstructorId: user?.studentMapInstructorId || '',
          instructorId: user?.instructorId || '',
          studentId: user?.studentId || '',
          studentName: user?.studentName || ''
        });
      }
    });
      return newSelected;
    });
  };

  // Check if all users are selected
  const areAllSelected = 
    Array.isArray(listDataStudentMapInstructor) && 
    listDataStudentMapInstructor.length > 0 && 
    listDataStudentMapInstructor.every((user, idx) => selectedStudentMapInstructor.has(user?.id ?? idx));
  
  // Check if some (but not all) are selected
  const areSomeSelected = 
    Array.isArray(listDataStudentMapInstructor) && 
    listDataStudentMapInstructor.length > 0 && 
    selectedStudentMapInstructor.size > 0 && 
    !areAllSelected;
  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list all majors when component mounts
    handleSelectUserIdGetFromAccountLogin();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Reset checkbox selection when student map instructor list changes
    setSelectedStudentMapInstructor(new Set());
  }, [listDataStudentMapInstructor]);


  //Handle for select list student map instructor API call 
  const handleSelectListUsers = async (studentId) => {
    try {
      const response = await dispatch(selectListCriticalByStudentIdApi({ 
        studentId: studentId,
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataStudentMapInstructor will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };  
  //Handle for select list student map instructor API call 
  const handleSelectListUsersSearch = async () => {
    try {
      const response = await dispatch(selectListCriticalByStudentIdApi({ 
        studentId: userIdGetFromAccountLogin.id
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataStudentMapInstructor will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };

  // Handler for edit form input changes
  const handleInputChangeSearch = (event) => {
    const { name, value } = event.target;
    setFormDataSearch((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Existing JSX with modifications for state */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Thông tin giảng viên phản biện</h1>

          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <label htmlFor="users-name-search">Mã sinh viên map giảng viên phản biện</label>
                  <input type="text" name="studentMapInstructorId" id="users-name-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã sinh viên và giảng viên phản biện" onChange={handleInputChangeSearch} />
                </div>
              </form>
            </div>
          </div>
          <div className="sm:flex">   
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">

              <button
                type="button"
                onClick={handleSelectListUsersSearch} // Use state handler instead of data attributes
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Tìm kiếm
              </button>   
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {!listDataStudentMapInstructorLoading && !listDataStudentMapInstructor?.length && <span>Không tìm thấy dữ liệu.</span>}
              {!listDataStudentMapInstructorLoading && listDataStudentMapInstructor?.length > 0 && (
                <span>{`Tổng số bản ghi: ${totalRecord}`}</span>
              )}
            </div>
            </div>
            {/* Button insert and export excel */}
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
            </div>
          </div>
                   
        </div>
      </div>
      {/* <!-- Start table student map instructor --> */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên giảng viên phản biện
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {Array.isArray(listDataStudentMapInstructor) && listDataStudentMapInstructor.length ? (
                    listDataStudentMapInstructor.map((studentMapInstructor, idx) => {
                      const studentMapInstructorId = studentMapInstructor?.studentMapInstructorId;
                      const studentId = studentMapInstructor?.id;
                      const instructorName = studentMapInstructor?.fullName;
                      const activeStatus = studentMapInstructor?.status === '1' || studentMapInstructor?.status === 1 || studentMapInstructor?.status === true;

                      return (
                        <tr key={studentId} className="hover:bg-gray-100 dark:hover:bg-gray-700">

                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {instructorName}
                          </td>
                          <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full bg-green-400 mr-2`} />
                              <span>Hoạt động</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Không tìm thấy dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End table student map instructor --> */}


      {/* <!-- Start pagination --> */}
      <div
        className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <Pagination
          showSizeChanger={false}
          pageSize={pager.pageSize}
          current={pager.pageNum}
          total={totalRecord || 0}
          onChange={_onChangePagination}
          className="mx-auto"
        />
      </div>
      {/* <!-- End pagination --> */}
</>
  );
}

export default StudentMapCriticalManagement;