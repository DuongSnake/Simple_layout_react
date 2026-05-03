import React, { useState, useEffect } from 'react';
import { selectListApi, createApi, selectAllRolesApi, updateApi, deleteApi } from "./UserManagementAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import 'antd/dist/reset.css';

function UserManagement() {
  // State for modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [pendingRoleValue, setPendingRoleValue] = useState('');
  const dispatch = useDispatch();
  const listDataUser = useSelector(state => state.userManagement.selectList.data);
  const totalRecord = useSelector(state => state.userManagement.selectList.totalRecord);
  const listDataUserLoading = useSelector(state => state.userManagement.selectList.loading);
  const listAllRoles = useSelector(state => state.userManagement.selectAllRoles.data);

  // State for form data (example for Add User modal)
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    fullName: '',
    identityCard: null,
    address: null,
    note: null,
    role: null,
  });

  // State for form data (Edit User modal)
  const [formDataEdit, setFormDataEdit] = useState({
    id: '',
    username: '',
    email: '',
    phone: '',
    fullName: '',
    identityCard: null,
    address: null,
    note: null,
    roles: '',
  });

  // State for date picker
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  // State for checkbox selection
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListUsers(page, pageSize);
  };

  // Handler for select all checkbox
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all users in current page
      const allUserIds = new Set(
        listDataUser?.map((user, idx) => user?.id ?? idx) || []
      );
      setSelectedUsers(allUserIds);
    } else {
      // Deselect all
      setSelectedUsers(new Set());
    }
  };

  // Handler for individual row checkbox
  const handleUserCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  // Check if all users are selected
  const areAllSelected = 
    Array.isArray(listDataUser) && 
    listDataUser.length > 0 && 
    listDataUser.every((user, idx) => selectedUsers.has(user?.id ?? idx));
  
  // Check if some (but not all) are selected
  const areSomeSelected = 
    Array.isArray(listDataUser) && 
    listDataUser.length > 0 && 
    selectedUsers.size > 0 && 
    !areAllSelected;
  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list user when component mounts
    handleSelectListUsers(pager.pageNum, pager.pageSize);
    //Select list all roles when component mounts
    handleSelectListAllRole();
    const handleButtonClick = (event) => {
      console.log('Button clicked:', event.target.textContent);
      // Add logic here, e.g., API calls or state updates
    };

    // Attach event listeners to buttons (example for Add User button)
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
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    console.log('Redux listDataUser changed:', listDataUser);
    console.log('Redux listAllRole changed:', listAllRoles);
    // Reset checkbox selection when user list changes
    setSelectedUsers(new Set());
  }, [listDataUser, listAllRoles]);

  // Handlers for modal toggles
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openWarningModal = () => setIsWarningModalOpen(true);
  const closeWarningModal = () => setIsWarningModalOpen(false);

  // Handler for role change in add user modal
  const handleRoleChange = (event) => {
      // Directly set the new role value
    const selectedValue = event.target.value;
      setFormData((prev) => ({ ...prev, role: selectedValue }));
  };

  // Handler for opening edit modal with user data
  const handleOpenEditModal = (user) => {
    setFormDataEdit({
      id: user?.id || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      fullName: user?.fullName || '',
      identityCard: user?.identityCard || null,
      address: user?.address || null,
      note: user?.note || null,
      roles: user?.roles?.id || '',
    });
    setIsEditModalOpen(true);
  };

  // Handler for form submit in add user modal
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Check if current role value is null
    if (formData.role === null) {
      openWarningModal();
      return;
    }else{
    handleCreate(); // Call the create API function
    closeAddModal(); // Close modal after submit
    //set timeout to ensure the create API call completes before refreshing the list
    setTimeout(() => {
      handleSelectListUsers(pager.pageNum, pager.pageSize); // Refresh user list after creation
    }, 1500);
    } 
  };

  // Handler for form submit in edit user modal
  const handleFormSubmitEditUser = (event) => {
    event.preventDefault();
    handleUpdate(); // Call the update API function
    closeEditModal(); // Close modal after submit
    // set timeout to ensure the update API call completes before refreshing the list
    setTimeout(() => {
      handleSelectListUsers(pager.pageNum, pager.pageSize); // Refresh user list after creation
    }, 500);
  };

  //Handle for create user API call 
  const handleCreate = async () => {
    try {
      const response = await dispatch(createApi({ username: formData.username, email: formData.email
        ,phone : formData.phone, fullName: formData.fullName, identityCard: null, address: null
        , note: null, roles: formData.roles
       }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("insert successful:", response.payload);
        // Store token and user info
      } else {
        console.error("insert failed:", response.payload);
      }
    } catch (error) {
      console.error("insert error:", error);
    }
  };

  //Handle for update user API call 
  const handleUpdate = async () => {
    try {
      const response = await dispatch(updateApi({ username: formDataEdit.username, email: formDataEdit.email
        ,phone : formDataEdit.phone, fullName: formDataEdit.fullName, identityCard: null, address: null
        , note: null, id: formDataEdit.id
       }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("update successful:", response.payload);
        // Store token and user info
      } else {
        console.error("update failed:", response.payload);
      }
    } catch (error) {
      console.error("update error:", error);
    }
  };

  //Handle for select list user API call 
  const handleSelectListUsers = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListApi({ userName: null, email: null
        ,phone : null, fullName: null, identityCard: null, status: null
        , id: null, pageRequestDto : { pageNum, pageSize }
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataUser will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };

  //Handle for select list all roles API call 
  const handleSelectListAllRole = async () => {
    try {
      const response = await dispatch(selectAllRolesApi());
      if (response.type.endsWith('/fulfilled')) {
        // console.log("select all roles successful payload:", response.payload);
      } else {
        console.error("select all roles failed:", response.payload);
      }
    } catch (error) {
      console.error("select all roles error:", error);
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

  // Date picker handlers
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const toggleFromDatePicker = () => {
    setIsFromDatePickerOpen(!isFromDatePickerOpen);
    setIsToDatePickerOpen(false);
  };

  const toggleToDatePicker = () => {
    setIsToDatePickerOpen(!isToDatePickerOpen);
    setIsFromDatePickerOpen(false);
  };

  const handleDateSelect = (date, type) => {
    if (type === 'from') {
      setFromDate(date);
      setIsFromDatePickerOpen(false);
    } else {
      setToDate(date);
      setIsToDatePickerOpen(false);
    }
  };

  // Generate dates for calendar (simple month view)
  const generateCalendarDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const dates = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

  return (
    <>
      {/* Existing JSX with modifications for state */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách tài khoản</h1>

          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3" action="#" method="GET">
                <label htmlFor="users-search" className="sr-only">Search</label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <input type="text" name="email" id="users-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for users"/>
                </div>
              </form>
              <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                <a href="#"
                  className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#"
                  className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#"
                  className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#"
                  className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="sm:flex">   
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {!listDataUserLoading && !listDataUser?.length && <span>Không tìm thấy dữ liệu.</span>}
              {!listDataUserLoading && listDataUser?.length > 0 && (
                <span>{`Tổng số bản ghi: ${totalRecord}`}</span>
              )}
            </div>
            {/* Button insert and export excel */}
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={openAddModal} // Use state handler instead of data attributes
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"></path>
                </svg>
                Thêm mới
              </button>
              <a href="#"
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                data-modal-hide="delete-user-modal">
                <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"></path>
                </svg>
                Xuất exel
              </a>
            </div>
          </div>
                   
        </div>
      </div>
      {/* <!-- Start table user --> */}
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
                      Tên đăng nhập
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Email
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Quyền
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Số điện thoại
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Trạng thái
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {Array.isArray(listDataUser) && listDataUser.length ? (
                    listDataUser.map((user, idx) => {
                      const userId = user?.id;
                      const userEmail = user.email;
                      const userName = user?.username;
                      const noteUser = user?.note;
                      const phoneNumber = user?.phone;
                      const identityCardUser = user?.identityCard;
                      const activeStatus = user?.status === '1' || user?.status === 1 || user?.status === true;

                      return (
                        <tr key={userId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input 
                                id={`checkbox-${userId}`} 
                                aria-describedby="checkbox-1" 
                                type="checkbox"
                                checked={selectedUsers.has(userId)}
                                onChange={() => handleUserCheckboxChange(userId)}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                              <label htmlFor={`checkbox-${userId}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {userName}
                          </td>
                          {/* <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              <div className="text-base font-semibold text-gray-900 dark:text-white">{userName}</div>
                              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{userEmail}</div>
                            </div>
                          </td> */}
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {userEmail}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {user?.roles != null ?  user?.roles.name : 'Chưa có quyền'}
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {phoneNumber}
                          </td>
                          <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center">
                              <div className={`h-2.5 w-2.5 rounded-full ${activeStatus ? 'bg-green-400' : 'bg-red-500'} mr-2`} />
                              <span>{activeStatus ? 'Hoạt động' : 'Không hoạt động'}</span>
                            </div>
                          </td>
                          <td className="p-4 space-x-2 whitespace-nowrap">
                            <button type="button" onClick={() => handleOpenEditModal(user)}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                              </svg>Sửa
                            </button>
                            <button type="button" onClick={openDeleteModal}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"></path>
                              </svg>Xóa
                            </button>
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
      {/* <!-- End table user --> */}


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

      {/* <!-- Edit User Modal --> */}
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
                  Edit user
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
                      <label htmlFor="edit-user-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên
                        đăng nhập</label>
                      <input type="text" name="username" value={formDataEdit.username} onChange={handleInputChangeEdit} id="edit-user-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tên đăng nhập" required/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-full-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ
                        và tên</label>
                      <input type="text" name="fullName" value={formDataEdit.fullName} onChange={handleInputChangeEdit} id="edit-full-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Họ và tên" required/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" value={formDataEdit.email} onChange={handleInputChangeEdit} id="edit-email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="example@company.com" required/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                      <input type="text" name="phone" value={formDataEdit.phone} onChange={handleInputChangeEdit} id="edit-phone"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Số điện thoại" required/>
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

      {/* <!-- Add User Modal --> */}
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
                      <label htmlFor="user-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                        Tên đăng nhập</label>
                      <input type="text" name="username" value={formData.username} onChange={handleInputChange} id="user-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Bonnie" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="full-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                        Họ và tên</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} id="full-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Green" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="example@company.com" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} id="phone"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="e.g. React developer" required />
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="category-create" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                        Quyền</label>
                      <select id="category-create" value={formData.role || ''} onChange={handleRoleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listAllRoles) && listAllRoles.length ? (
                          <>
                        <option value="">Select category</option>
                        {listAllRoles.map((role, idx) => {
                          return (
                          <option key={idx} value={role.id}>
                            {role.name}
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
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Vui lòng chọn quyền trước khi lưu.</h3>
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

      {/* <!-- Delete User Modal --> */}
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this
                  user?</h3>
                <a href="#"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                  Yes, I'm sure
                </a>
                <a href="#"
                  onClick={closeDeleteModal} // Changed to state handler
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  data-modal-hide="delete-user-modal">
                  No, cancel
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

export default UserManagement;