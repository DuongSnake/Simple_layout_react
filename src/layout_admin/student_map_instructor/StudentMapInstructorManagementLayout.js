import React, { useState, useEffect } from 'react';
import { selectListStudentMapInstructorApi, createApi, updateApi, deleteApi } from "./StudentMapInstructorManagementAPI";
import {selectAllStudentApi, selectAllInstructorApi} from "../user_management/UserManagementAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../.././App.css';

function StudentMapInstructorManagement() {
  // State for modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [pendingRoleValue, setPendingRoleValue] = useState('');
  const dispatch = useDispatch();
  const listDataStudentMapInstructor = useSelector(state => state.studentMapInstructorManagement.selectList.data);
  const totalRecord = useSelector(state => state.studentMapInstructorManagement.selectList.totalRecord);
  const listDataStudentMapInstructorLoading = useSelector(state => state.studentMapInstructorManagement.selectList.loading);
  const listAllInstructors = useSelector(state => state.userManagement.selectAllInstructors.data);
  const listAllStudents = useSelector(state => state.userManagement.selectAllStudents.data);

  // State for form data (example for Add student map instructor modal)
  const [formData, setFormData] = useState({
    instructorId: '',
    studentId: ''
  });

  // State for form data (Edit student map instructor modal)
  const [formDataEdit, setFormDataEdit] = useState({
    studentMapInstructorId: '',
    instructorId: '',
    studentId: '',
    studentName: ''
  });

  // State for form data (Search student map instructor modal)
  const [formDataSearch, setFormDataSearch] = useState({
    studentMapInstructorId: '',
    instructorId: '',
    studentId: '',
    fromDate: '',
    toDate: '',
    status: '',
  });

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  // State for checkbox selection
  const [selectedStudentMapInstructor, setSelectedStudentMapInstructor] = useState(new Set());
  
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListUsers(page, pageSize);
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

  //Handle case when change size list selected user
  useEffect(() => {
    handleEnableButtonActions();
  }, [selectedStudentMapInstructor]);
  //Handle case when click button edit or delete but no student map instructor selected
  const handleEnableButtonActions = () => {
    if(selectedStudentMapInstructor != null &&  selectedStudentMapInstructor.size === 0){
    //Disable edit and delete button when no student map instructor selected
      disableButtonEditDelete(true, true);
    } else if(selectedStudentMapInstructor != null && selectedStudentMapInstructor.size === 1){
    //Enable edit button and disable delete button when only 1 student map instructor selected
      disableButtonEditDelete(false, false);
    }else{
    //Disable edit and enable delete button when multiple users selected
      disableButtonEditDelete(true, false);
    }

  };
  const disableButtonEditDelete = (statusEdit, statusDelete) => {
    //Set disabled attribute for edit and delete button
    document.getElementById("edit-user-button").disabled = statusEdit;
    document.getElementById("delete-user-button").disabled = statusDelete;
    //Add css for disabled button edit
    if(statusEdit){
    document.getElementById("edit-user-button").classList.add("button-disabled");
    }else{
    document.getElementById("edit-user-button").classList.remove("button-disabled");
    }
    //Add css for disabled button delete
    if(statusDelete){
    document.getElementById("delete-user-button").classList.add("button-disabled");
    } else {
    document.getElementById("delete-user-button").classList.remove("button-disabled");
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
    //Select list student map instructor when component mounts
    handleSelectListUsers(pager.pageNum, pager.pageSize);
    //Select list all students when component mounts
    handleSelectListAllStudent();
    handleSelectListAllInstructor();
    const handleButtonClick = (event) => {
      console.log('Button clicked:', event.target.textContent);
      // Add logic here, e.g., API calls or state updates
    };

    // Attach event listeners to buttons (example for Add student map instructor button)
    const addButton = document.querySelector('[data-modal-target="add-user-modal"]');
    if (addButton) {
      addButton.addEventListener('click', handleButtonClick);
    }

    // Cleanup
    return () => {
      if (addButton) {
        addButton.removeEventListener('click', handleButtonClick);
      }
    };
    handleSelectListAllInstructor(); // Fetch all instructors when component mounts
    handleSelectListAllStudent(); // Fetch all students when component mounts
    disableButtonEditDelete(true, true); // Initially disable edit and delete buttons
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    console.log('Redux listAllStudents changed:', listAllStudents);
    // Reset checkbox selection when student map instructor list changes
    setSelectedStudentMapInstructor(new Set());
  }, [listDataStudentMapInstructor, listAllInstructors, listAllStudents]);

  // Handlers for modal toggles
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openWarningModal = () => setIsWarningModalOpen(true);
  const closeWarningModal = () => setIsWarningModalOpen(false);

  // Handler for instructor change in add student map instructor modal
  const handleInstructorChange = (event) => {
      // Directly set the new instructor value
    const selectedValue = event.target.value;
      setFormData((prev) => ({ ...prev, instructorId: selectedValue }));
  };
  // Handler for instructor change in edit student map instructor modal
  const handleInstructorEditChange = (event) => {
      // Directly set the new instructor value
    const selectedValue = event.target.value;
      setFormDataEdit((prev) => ({ ...prev, instructorId: selectedValue }));
  };

  // Handler for student change in add student map instructor modal
  const handleStudentChange = (event) => {
      // Directly set the new student value
    const selectedValue = event.target.value;
      setFormData((prev) => ({ ...prev, studentId: selectedValue }));
  };

  // Handler for student change in edit student map instructor modal
  const handleStudentEditChange = (event) => {
      // Directly set the new student value
    const selectedValue = event.target.value;
      setFormDataEdit((prev) => ({ ...prev, studentId: selectedValue }));
  };

  // Handler for opening edit modal with student map instructor data
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Handler for form submit in add student map instructor modal
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Check if current instructor value is null
    if (formData.instructorId === null || formData.instructorId === '') {
      openWarningModal();
      return;
    }else{
    handleCreate(); // Call the create API function
    closeAddModal(); // Close modal after submit
    //set timeout to ensure the create API call completes before refreshing the list
    setTimeout(() => {
      handleSelectListUsers(pager.pageNum, pager.pageSize); // Refresh student map instructor list after creation
    }, 1500);
    } 
  };

  // Handler for form submit in edit student map instructor modal
  const handleFormSubmitEditUser = (event) => {
    event.preventDefault();
    handleUpdate(); // Call the update API function
    closeEditModal(); // Close modal after submit
    // set timeout to ensure the update API call completes before refreshing the list
    setTimeout(() => {
      handleSelectListUsers(pager.pageNum, pager.pageSize); // Refresh student map instructor list after creation
    }, 500);
  };

  //Handle for create student map instructor API call 
  const handleCreate = async () => {
    try {
      const response = await dispatch(createApi({ username: formData.username, email: formData.email
        ,phone : formData.phone, fullName: formData.fullName, identityCard: null, address: null
        , note: null, roles: formData.roles
       }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("insert successful:", response.payload);
        // Store token and student map instructor info
      } else {
        console.error("insert failed:", response.payload);
      }
    } catch (error) {
      console.error("insert error:", error);
    }
  };

  //Handle for update student map instructor API call 
  const handleUpdate = async () => {
    try {
      const response = await dispatch(updateApi({ 
        studentMapInstructorId: formDataEdit.studentMapInstructorId, 
        instructorId: formDataEdit.instructorId,
        studentId : formDataEdit.studentId
       }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("update successful:", response.payload);
        // Store token and student map instructor info
      } else {
        console.error("update failed:", response.payload);
      }
    } catch (error) {
      console.error("update error:", error);
    }
  };

  //Handle for update student map instructor API call 
  const handleDeleteUser = async () => {
    try {
      const response = await dispatch(deleteApi({ listData: Array.from(selectedStudentMapInstructor)
       }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("update successful:", response.payload);
        // set timeout to ensure the update API call completes before refreshing the list
      setTimeout(() => {
      handleSelectListUsers(pager.pageNum, pager.pageSize); // Refresh student map instructor list after creation
      }, 500);
      } else {
        console.error("update failed:", response.payload);
      }
    } catch (error) {
      console.error("update error:", error);
    }
  };

  //Handle for select list student map instructor API call 
  const handleSelectListUsers = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListStudentMapInstructorApi({ 
        studentMapInstructorId: null, 
        instructorId: null,
        studentId : null, 
        fromDate: null, 
        toDate: null, 
        status: null,
        pageRequestDto : { pageNum, pageSize }
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
      const response = await dispatch(selectListStudentMapInstructorApi({ 
        studentMapInstructorId: formDataSearch.studentMapInstructorId,
         instructorId: formDataSearch.instructorId,
         studentId : formDataSearch.studentId,
         fromDate: formDataSearch.fromDate,
         toDate: null, 
         status: null,
         pageRequestDto : { pageNum: pager.pageNum, pageSize: pager.pageSize }
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

  //Handle for select list all student API call 
  const handleSelectListAllStudent = async () => {
    try {
      const response = await dispatch(selectAllStudentApi());
      if (response.type.endsWith('/fulfilled')) {
        // console.log("select all students successful payload:", response.payload);
      } else {
        console.error("select all students failed:", response.payload);
      }
    } catch (error) {
      console.error("select all students error:", error);
    }
  };

  //Handle for select list all instructor API call 
  const handleSelectListAllInstructor = async () => {
    try {
      const response = await dispatch(selectAllInstructorApi());
      if (response.type.endsWith('/fulfilled')) {
        // console.log("select all instructors successful payload:", response.payload);
      } else {
        console.error("select all instructors failed:", response.payload);
      }
    } catch (error) {
      console.error("select all instructors error:", error);
    }
  };

  // Handler for form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for edit form input changes
  const handleInputChangeEdit = (event) => {
    const { name, value } = event.target;
    setFormDataEdit((prev) => ({ ...prev, [name]: value }));
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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách sinh viên map giảng viên hướng dẫn</h1>

          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
              <div className="relative mt-1 lg:w-64 xl:w-96">
                <label htmlFor="users-name-search">Mã sinh viên map giảng viên hướng dẫn</label>
                  <input type="text" name="studentMapInstructorId" id="users-name-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã sinh viên và giảng viên hướng dẫn" onChange={handleInputChangeSearch} />
                </div>
                {/* <div className="relative mt-1 lg:w-64 xl:w-96">
                <label htmlFor="users-email-search">Email</label>
                  <input type="text" name="email" id="users-email-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm email" onChange={handleInputChangeSearch} />
                </div>

                <div className="relative mt-1 lg:w-64 xl:w-96">
                <label htmlFor="users-full-name-search">Họ và tên</label>
                  <input type="text" name="fullName" id="users-full-name-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm họ và tên" onChange={handleInputChangeSearch} />
                </div> */}
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
              <button
                type="button"
                onClick={openAddModal} // Use state handler instead of data attributes
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Thêm mới
              </button>
              {/* <a href="#"
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                data-modal-hide="delete-user-modal">
                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"></path>
                </svg>
                Xuất exel
              </a> */}
              <button
                type="button"
                id="edit-user-button"
                onClick={handleOpenEditModal} // Use state handler instead of data attributes
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sửa
              </button>
              <button
                type="button"
                id="delete-user-button"
                onClick={handleDeleteUser} // Use state handler instead of data attributes
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xóa
              </button>
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
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input 
                          id="checkbox-all" 
                          aria-describedby="checkbox-1" 
                          type="checkbox"
                          checked={areAllSelected}
                          onChange={handleSelectAllChange}
                          ref={(input) => {
                            if (input) input.indeterminate = areSomeSelected;
                          }}
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên sinh viên
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên giảng viên hướng dẫn
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
                      const instructorId = studentMapInstructor.instructorId;
                      const studentId = studentMapInstructor?.studentId;
                      const instructorName = studentMapInstructor?.instructorName;
                      const studentName = studentMapInstructor?.studentName;
                      const activeStatus = studentMapInstructor?.status === '1' || studentMapInstructor?.status === 1 || studentMapInstructor?.status === true;
                      const fullName = studentMapInstructor?.fullName;

                      return (
                        <tr key={studentMapInstructorId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input 
                                id={`checkbox-${studentMapInstructorId}`} 
                                aria-describedby="checkbox-1" 
                                type="checkbox"
                                checked={selectedStudentMapInstructor.has(studentMapInstructorId)}
                                onChange={() => handleUserCheckboxChange(studentMapInstructorId)}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                              <label htmlFor={`checkbox-${studentMapInstructorId}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {studentName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {instructorName}
                          </td>
                          <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full ${activeStatus ? 'bg-green-400' : 'bg-red-500'} mr-2`} />
                              <span>{activeStatus ? 'Hoạt động' : 'Không hoạt động'}</span>
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

      {/* <!-- Edit student map instructor Modal --> */}
      {isEditModalOpen && (
        <div
          onClick={closeEditModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="edit-user-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full max-w-2xl px-4 md:h-auto flex items-center justify-center">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">
                  Chỉnh sửa
                </h3>
                <button type="button"
                  onClick={closeEditModal} // Changed to state handler
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-student-map-instructor-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sinh viên map giảng viên hướng dẫn</label>
                      <input type="text" name="studentMapInstructorId" value={formDataEdit.studentMapInstructorId} onChange={handleInputChangeEdit} id="edit-student-map-instructor-id"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Mã sinh viên map giảng viên hướng dẫn"   style={{disabled: true}, {backgroundColor: '#adabab'}, {cursor: 'not-allowed'}}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-student-map-instructor-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sinh viên</label>
                      <input type="text" name="studentName" value={formDataEdit.studentName} onChange={handleInputChangeEdit} id="edit-student-map-instructor-id"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tên sinh viên"   style={{disabled: true}, {backgroundColor: '#adabab'}, {cursor: 'not-allowed'}}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category-instructor-id-create" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giảng viên hướng dẫn</label>
                      <select id="category-instructor-id-create" value={formDataEdit.instructorId || ''} onChange={handleInstructorEditChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                        focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listAllInstructors) && listAllInstructors.length ? (
                          <>
                        <option value="">Select instructor</option>
                        {listAllInstructors.map((instructor, idx) => {
                          return (
                          <option key={idx} value={instructor.id}>
                            {instructor.fullName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">Không tìm thấy</option>)}
                      </select>
                    </div>
                  </div>
              {/* <!-- Modal footer --> */}
              <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                   onClick={handleFormSubmitEditUser}>Cập nhật</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* <!-- Add student map instructor Modal --> */}
      {isAddModalOpen && (
        <div
          onClick={closeAddModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="add-user-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">
                  Thêm mới người dùng
                </h3>
                <button type="button"
                  onClick={closeAddModal} // Changed to state handler
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category-create" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sinh viên</label>
                      <select id="category-create" value={formData.studentId || ''} onChange={handleStudentChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listAllStudents) && listAllStudents.length ? (
                          <>
                        <option value="">Select student</option>
                        {listAllStudents.map((student, idx) => {
                          return (
                          <option key={idx} value={student.id}>
                            {student.fullName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">Không tìm thấy</option>)}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category-create" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giảng viên hướng dẫn</label>
                      <select id="category-create" value={formData.instructorId || ''} onChange={handleInstructorChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listAllInstructors) && listAllInstructors.length ? (
                          <>
                        <option value="">Select instructor</option>
                        {listAllInstructors.map((instructor, idx) => {
                          return (
                          <option key={idx} value={instructor.id}>
                            {instructor.fullName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">Không tìm thấy</option>)}
                      </select>
                    </div>
                  </div>
              {/* <!-- Modal footer --> */}
              <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                   onClick={handleFormSubmit}>Thêm mới</button>
              </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* <!-- Warning notification modal for Role Change --> */}
      {isWarningModalOpen && (
        <div
          onClick={closeWarningModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="warning-role-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex justify-end p-2">
                <button type="button"
                  onClick={closeWarningModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 pt-0 text-center">
                <svg className="w-16 h-16 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Vui lòng chọn giảng viên hướng dẫn trước khi lưu.</h3>
                <button
                  onClick={closeWarningModal}
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Delete student map instructor Modal --> */}
      {isDeleteModalOpen && (
        <div
          onClick={closeDeleteModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="delete-user-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex justify-end p-2">
                <button type="button"
                  onClick={closeDeleteModal} // Changed to state handler
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 pt-0 text-center">
                <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Bạn có chắc chắn xóa người dùng ngày?</h3>
                <a onClick={handleDeleteUser}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                  Chắc chắn
                </a>
                <a onClick={closeDeleteModal} // Changed to state handler
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  data-modal-hide="delete-user-modal">
                  Không, hủy bỏ
                </a>
              </div>
            </div>
          </div>
      {/* <!-- End main --> */}
        </div>
      )}
</>
  );
}

export default StudentMapInstructorManagement;