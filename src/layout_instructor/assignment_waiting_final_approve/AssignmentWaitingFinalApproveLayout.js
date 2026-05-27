import React, { useState, useEffect } from 'react';
import { approveFinalAssignmentApi, selectListAssignmentFinalApproveApi  } from "./AssignmentWaitingFinalApproveAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../.././App.css';
function AssignmentWaitingFinalApproveLayout() {
  // State for modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listDataAssignmentRegister = useSelector(state => state.assignmentFinalApproveManagement.selectListAssignmentFinalApprove.data);
  const totalRecord = useSelector(state => state.assignmentFinalApproveManagement.selectListAssignmentFinalApprove.totalRecord);
  const listDataAssignmentStudentRegisterLoading = useSelector(state => state.assignmentFinalApproveManagement.selectListAssignmentFinalApprove.loading);

  // State for form data (Add PeriodAssignment modal)
  const [formData, setFormData] = useState({
    fileUpload: '',
    studentId: '',
    instructorId: '',
    periodAssignmentId: '',
    assignmentStudentRegisterName: '',
    statusAutoMap: 'Y'
  });

  // State for form data (Edit PeriodAssignment modal)
  const [formDataEdit, setFormDataEdit] = useState({
    assignmentStudentRegisterId: '',
    fileUpload: '',
    studentId: '',
    studentName: '',
    instructorName: '',
    periodAssignmentId: '',
    assignmentStudentRegisterName: '',
    statusAutoMap: 'Y',
    oldValueId: ''
  });

  // State for form data (Search PeriodAssignment modal)
  const [formDataSearch, setFormDataSearch] = useState({
    assignmentStudentRegisterId: '',
    periodAssignmentId: '',
    assignmentStudentRegisterName: '',
    fromDate: '',
    toDate: '',
    status: '',
    instructorId: ''
  });

  // State for pagination
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  // State for checkbox selection
  const [selectedDataAssignmentRegister, setSelectedDataAssignmentRegister] = useState(new Set());
  
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListPeriodAssignments(page, pageSize);
  };

  // Handler for select all checkbox
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all periodAssignments in current page
      const allPeriodAssignmentIds = new Set(
        listDataAssignmentRegister?.map((periodAssignment, idx) => periodAssignment?.assignmentStudentRegisterId ?? idx) || []
      );
      setSelectedDataAssignmentRegister(allPeriodAssignmentIds);
    } else {
      // Deselect all
      setSelectedDataAssignmentRegister(new Set());
    }
  };

  //Handle case when change size list selected periodAssignment
  useEffect(() => {
    handleEnableButtonActions();
  }, [selectedDataAssignmentRegister]);

  //Handle case when click button edit or delete but no periodAssignment selected
  const handleEnableButtonActions = () => {
    if(selectedDataAssignmentRegister != null && selectedDataAssignmentRegister.size === 0){
      //Disable edit and delete button when no periodAssignment selected
      disableButtonEditDelete(true, true);
    } else if(selectedDataAssignmentRegister != null && selectedDataAssignmentRegister.size === 1){
      //Enable edit button and disable delete button when only 1 periodAssignment selected
      disableButtonEditDelete(false, false);
    }else{
      //Disable edit and enable delete button when multiple periodAssignments selected
      disableButtonEditDelete(true, false);
    }
  };

  const disableButtonEditDelete = (statusEdit, statusDelete) => {
    //Set disabled attribute for edit and delete button
    const editBtn = document.getElementById("edit-period-assignment-button");
    const deleteBtn = document.getElementById("delete-period-assignment-button");
    const reserveBtn = document.getElementById("reserve-assignment-button");
    
    if(editBtn) {
      editBtn.disabled = statusEdit;
      if(statusEdit){
        editBtn.classList.add("button-disabled");
      }else{
        editBtn.classList.remove("button-disabled");
      }
    }
    
    if(deleteBtn) {
      deleteBtn.disabled = statusDelete;
      if(statusDelete){
        deleteBtn.classList.add("button-disabled");
      } else {
        deleteBtn.classList.remove("button-disabled");
      }
    }
    
    if(reserveBtn) {
      reserveBtn.disabled = statusDelete;
      if(statusDelete){
        reserveBtn.classList.add("button-disabled");
      } else {
        reserveBtn.classList.remove("button-disabled");
      }
    }
  };

  
    //Handle for select list all period assignments API call 
  const handleSelectListAllAssignmentWaitingFinalApprove = async () => {
    try {
        const response = await dispatch(selectListAssignmentFinalApproveApi({ 
        assignmentStudentRegisterId: null, 
        assignmentStudentRegisterName: null,
        periodAssignmentId: null,
        fromDate: null,
        toDate: null,
        status: null,
        intructorId: null,
        pageRequestDto : { pageNum: 0, pageSize: 100 }
       }));
        if (response.type.endsWith('/fulfilled')) {
          // console.log("select all majors successful payload:", response.payload);
        } else {
          console.error("select all majors failed:", response.payload);
        }
      } catch (error) {
        console.error("select all majors error:", error);
      }
    };

  // Handler for individual row checkbox
  const handleDataAssignmentRegisterCheckboxChange = (periodAssignmentId) => {
    setSelectedDataAssignmentRegister((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(periodAssignmentId)) {
        newSelected.delete(periodAssignmentId);
      } else {
        newSelected.add(periodAssignmentId);
      }
      //Set value for edit form when click checkbox of periodAssignmentId
      listDataAssignmentRegister.forEach(assignmentRegister => {
        if (assignmentRegister.assignmentStudentRegisterId === periodAssignmentId) {
          setFormDataEdit({
            assignmentStudentRegisterId: assignmentRegister?.assignmentStudentRegisterId || '',
            assignmentStudentRegisterName: assignmentRegister?.assignmentStudentRegisterName || '',
            periodAssignmentId: assignmentRegister?.periodAssignmentId || '',
            instructorName: assignmentRegister?.instructorName || '',
            studentId: assignmentRegister?.studentId || '',
            studentName: assignmentRegister?.studentName || '',
            fileUpload: assignmentRegister?.fileName || '',
            statusAutoMap: assignmentRegister?.statusAutoMap || ''
          });
        }
      });
      return newSelected;
    });
  };

  // Check if all periodAssignments are selected
  const areAllSelected = 
    Array.isArray(listDataAssignmentRegister) && 
    listDataAssignmentRegister.length > 0 && 
    listDataAssignmentRegister.every((periodAssignment, idx) => selectedDataAssignmentRegister.has(periodAssignment?.periodAssignmentId ?? idx));
  
  // Check if some (but not all) are selected
  const areSomeSelected = 
    Array.isArray(listDataAssignmentRegister) && 
    listDataAssignmentRegister.length > 0 && 
    selectedDataAssignmentRegister.size > 0 && 
    !areAllSelected;


  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list all majors when component mounts
    handleSelectListAllAssignmentWaitingFinalApprove();
    disableButtonEditDelete(true, true); // Initially disable edit and delete buttons
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Reset checkbox selection when period assignment list changes
    setSelectedDataAssignmentRegister(new Set());
  }, [listDataAssignmentRegister]);

  // Handlers for modal toggles
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openReserveModal = () => setIsReserveModalOpen(true);
  const closeReserveModal = () => setIsReserveModalOpen(false);

  // Handler for opening edit modal with period assignment data
  const handleOpenEditPeriodAssignment = () => {
    setIsEditModalOpen(true);
  };


  //Handle for approve list assignment API call 
  const handleReserveListAssignment = async () => {
    try {
      console.log('Selected period assignment IDs for reservation:', Array.from(selectedDataAssignmentRegister)[0]);
      const response = await dispatch(approveFinalAssignmentApi({ listData: Array.from(selectedDataAssignmentRegister) }));
      // Check if reserve was successful
      if (response.type.endsWith('/fulfilled')) {
        // console.log("reserve successful:", response.payload);
        // set timeout to ensure the reserve API call completes before refreshing the list
      closeReserveModal();
        setTimeout(() => {
          handleSelectListPeriodAssignments(pager.pageNum, pager.pageSize); // Refresh period assignment list after reservation
        }, 500);
      } else {
        // console.error("reserve failed:", response.payload);
      }
    } catch (error) {
    //   console.error("reserve error:", error);
    }
  };

  //Handle for select list period assignment API call 
  const handleSelectListPeriodAssignments = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListAssignmentFinalApproveApi({ 
        assignmentStudentRegisterId: null, 
        periodAssignmentId: null,
        assignmentStudentRegisterName: null,
        admissionPeriodId: null,//Se khong hard code o day
        fromDate: null,
        toDate: null,
        pageRequestDto : { pageNum, pageSize }
       }));
       
      if (response.type.endsWith('/fulfilled')) {
      } else {
        // console.error("select list failed:", response.payload);
      }
    } catch (error) {
    //   console.error("select list error:", error);
    }
  };

  //Handle for select list period assignment API call with search
  const handleSelectListPeriodAssignmentsSearch = async () => {
    try {
      const response = await dispatch(selectListAssignmentFinalApproveApi({ 
        assignmentStudentRegisterId: formDataSearch.assignmentStudentRegisterId,
        periodAssignmentId: formDataSearch.periodAssignmentId, 
        assignmentStudentRegisterName: formDataSearch.assignmentStudentRegisterName,
        fromDate: formDataSearch.fromDate,
        toDate: formDataSearch.toDate,
        status: null,
        pageRequestDto : { pageNum: pager.pageNum, pageSize: pager.pageSize }
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataAssignmentRegister will reflect the updated value on next render
      } else {
        // console.error("select list failed:", response.payload);
      }
    } catch (error) {
    //   console.error("select list error:", error);
    }
  };
  // Handler for search form input changes
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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách phê duyệt đồ án sinh viên</h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="admission-period-id-search">Mã đăng ký đồ án sinh viên</label>
                  <input type="text" name="assignmentRegisterId" id="admission-period-id-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã đăng ký đồ án" onChange={handleInputChangeSearch} />
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="admission-period-name-search">Tên đồ án</label>
                  <input type="text" name="assignmentStudentRegisterName" id="admission-period-name-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm tên đồ án" onChange={handleInputChangeSearch} />
                </div>
              </form>
            </div>
          </div>
          <div className="sm:flex">   
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <button
                type="button"
                onClick={handleSelectListPeriodAssignmentsSearch}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Tìm kiếm
              </button>   
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                {!listDataAssignmentRegister && !listDataAssignmentRegister?.length && <span>Không tìm thấy dữ liệu.</span>}
                {!listDataAssignmentStudentRegisterLoading && listDataAssignmentRegister?.length > 0 && (
                  <span>{`Tổng số bản ghi: ${totalRecord}`}</span>
                )}
              </div>
            </div>
            {/* Button insert */}
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                id="edit-period-assignment-button"
                onClick={handleOpenEditPeriodAssignment}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xem
              </button>
              {/* <button
                type="button"
                id="delete-period-assignment-button"
                onClick={openDeleteModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xóa
              </button> */}
              <button
                type="button"
                id="reserve-assignment-button"
                onClick={openReserveModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Phê duyệt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Start table period assignment --> */}
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
                      Tên đồ án
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
                      Map thủ công
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Trạng thái phê duyệt
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {Array.isArray(listDataAssignmentRegister) && listDataAssignmentRegister.length ? (
                    listDataAssignmentRegister.map((assignmentRegister, idx) => {
                      const assignmentStudentRegisterId = assignmentRegister?.assignmentStudentRegisterId;
                      const assignmentStudentRegisterName = assignmentRegister?.assignmentStudentRegisterName;
                      const studentName = assignmentRegister?.studentName;
                      const instructorName = assignmentRegister?.instructorName;
                      const statusAutoMap = assignmentRegister?.statusAutoMap;
                      const isApproved = assignmentRegister?.isApproved;
                      const isApprovedDisplayName = assignmentRegister?.isApprovedDisplayName;
                      const statusAutoMapDisplayName = assignmentRegister?.statusAutoMapDisplayName;
                      const activeStatus = assignmentRegister?.status === '1' || assignmentRegister?.status === 1 || assignmentRegister?.status === true;

                      return (
                        <tr key={assignmentStudentRegisterId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input 
                                id={`checkbox-${assignmentStudentRegisterId}`} 
                                aria-describedby="checkbox-1" 
                                type="checkbox"
                                checked={selectedDataAssignmentRegister.has(assignmentStudentRegisterId)}
                                onChange={() => handleDataAssignmentRegisterCheckboxChange(assignmentStudentRegisterId)}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                              <label htmlFor={`checkbox-${assignmentStudentRegisterId}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {assignmentStudentRegisterName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {studentName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {instructorName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                           {isApprovedDisplayName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {statusAutoMapDisplayName}
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
                      <td colSpan="5" className="p-4 text-center text-gray-500 dark:text-gray-400">
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
      {/* <!-- End table period assignment --> */}

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

      {/* <!-- Edit Period Assignment Modal --> */}
      {isEditModalOpen && (
        <div
          onClick={closeEditModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="edit-admission-period-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full max-w-2xl px-4 md:h-auto flex items-center justify-center">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">
                  Cập nhật đăng ký đồ án sinh viên
                </h3>
                <button type="button"
                  onClick={closeEditModal}
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
                      <label htmlFor="edit-admission-period-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã đăng ký đồ án sinh viên</label>
                      <input type="text" name="assignmentStudentRegisterId" value={formDataEdit.assignmentStudentRegisterId} readOnly={true} id="edit-admission-period-id"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Mã đăng ký đồ án sinh viên"  style={{disabled: true}, {backgroundColor: '#adabab'}, {cursor: 'not-allowed'}}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-admission-period-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đồ án</label>
                      <input type="text" name="assignmentStudentRegisterName" value={formDataEdit.assignmentStudentRegisterName} readOnly={true} id="edit-admission-period-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Ghi chú" required/>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    {/* start content to show and hide by status auto map */}
                      <div className="col-span-6 sm:col-span-3" style={{disabled: true}, {backgroundColor: '#adabab'}, {cursor: 'not-allowed'}}>
                        <label htmlFor="category-instructor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sinh vien</label>
                        
                        <input type="text" name="studentName" value={formDataEdit.studentName}  readOnly={true} id="edit-admission-period-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Ghi chú" required/>
                      </div>
                    {/* end content to show and hide by status auto map */}
                    </div>
                    {/* New element */}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Delete Admission Period Modal --> */}
      {isDeleteModalOpen && (
        <div
          onClick={closeDeleteModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="delete-admission-period-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex justify-end p-2">
                <button type="button"
                  onClick={closeDeleteModal}
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
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Bạn có chắc chắn muốn hủy phê duyệt bảo vệ đồ án này không?</h3>
                <button
                  onClick={handleReserveListAssignment}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                  Chắc chắn
                </button>
                <button
                  onClick={closeReserveModal}
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                  Không, hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Send request  Modal --> */}
      {isReserveModalOpen && (
        <div
          onClick={closeReserveModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="reserve-admission-period-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex justify-end p-2">
                <button type="button"
                  onClick={closeReserveModal}
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
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Bạn có chắc chắn muốn phê duyệt bảo vệ đồ án này không?</h3>
                <button
                  onClick={handleReserveListAssignment}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                  Chắc chắn
                </button>
                <button
                  onClick={closeReserveModal}
                  className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                  Không, hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AssignmentWaitingFinalApproveLayout;
