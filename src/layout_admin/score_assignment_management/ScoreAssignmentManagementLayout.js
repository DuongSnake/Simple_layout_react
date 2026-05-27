import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import { selectListAssignmentByPeriodTimeApi, createApi, updateApi, deleteApi, selectListApiScoresApi } from "./ScoreAssignmentManagementAPI";

import { selectListPeriodAssignmentApi } from "../period_assignment_management/PeriodAssignmentManagementAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../.././App.css';
function ScoreAssignmentManagement() {
  // State for modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listDataAssignmentRegister = useSelector(state => state.scoreAssignmentManagement.selectListApiScores.data);
  const totalRecord = useSelector(state => state.scoreAssignmentManagement.selectListApiScores.totalRecord);
  const listDataAssignmentStudentRegisterLoading = useSelector(state => state.scoreAssignmentManagement.selectListApiScores.loading);
  const listDataPeriodAssignment = useSelector(state => state.periodAssignmentManagement.selectListPeriodAssignment.data);
  const [listAllAssignmentFinalApprove, setListAllAssignmentFinalApprove] = useState([]);

  // State for form data (Add ScoreAssignment modal)
  const [formData, setFormData] = useState({
    assignmentRegisterId: '',
    scoreInstructor: 0.0,
    scoreExaminer: 0.0,
    scoreCritical: 0.0,
    admissionPeriodId: '',
    assignmentRegisterName: '',
  });

  // State for form data (Edit ScoreAssignment modal)
  const [formDataEdit, setFormDataEdit] = useState({
    scoreAssignmentId: '',
    assignmentRegisterId: '',
    scoreAverage: 0.0,
    scoreInstructor: 0.0,
    scoreExaminer: 0.0,
    scoreCritical: 0.0,
    admissionPeriodId: '',
    assignmentRegisterName: '',
    admissionPeriodName: '',
    status: ''
  });

  // State for form data (Search ScoreAssignment modal)
  const [formDataSearch, setFormDataSearch] = useState({
        scoreAssignmentId: null, 
        assignmentRegisterId: null,
        fromDate: null,
        toDate: null,
  });

  // State for pagination
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  // State for checkbox selection
  const [selectedPeriodAssignment, setSelectedPeriodAssignment] = useState(new Set());
  
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListScoreAssignments(page, pageSize);
  };

  // Handler for select all checkbox
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all score assignments in current page
      const allScoreAssignmentIds = new Set(
        listDataAssignmentRegister?.map((assignmentRegister, idx) => assignmentRegister?.assignmentRegisterId ?? idx) || []
      );
      setSelectedPeriodAssignment(allScoreAssignmentIds);
    } else {
      // Deselect all
      setSelectedPeriodAssignment(new Set());
    }
  };

  //Handle case when change size list selected periodAssignment
  useEffect(() => {
    handleEnableButtonActions();
  }, [selectedPeriodAssignment, listDataPeriodAssignment]);

  //Handle case when click button edit or delete but no periodAssignment selected
  const handleEnableButtonActions = () => {
    if(selectedPeriodAssignment != null && selectedPeriodAssignment.size === 0){
      //Disable edit and delete button when no periodAssignment selected
      disableButtonEditDelete(true, true);
    } else if(selectedPeriodAssignment != null && selectedPeriodAssignment.size === 1){
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
  };

  
    //Handle for select list all period assignments API call 
  const handleSelectListAllPeriodAssignments = async () => {
    try {
        const response = await dispatch(selectListPeriodAssignmentApi({ 
        periodAssignmentId: null, 
        startPeriod: null,
        endPeriod: null,
        admissionPeriodId: null,
        majorId: null,
        note: null,
        status: null,
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
  const handlePeriodAssignmentCheckboxChange = (scoreId) => {
    setSelectedPeriodAssignment((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(scoreId)) {
        newSelected.delete(scoreId);
      } else {
        newSelected.add(scoreId);
      }
      //Set value for edit form when click checkbox of scoreId
      listDataAssignmentRegister.forEach(assignmentRegister => {
        if (assignmentRegister.scoreAssignmentId === scoreId) {
          setFormDataEdit({
            scoreAssignmentId: assignmentRegister?.scoreAssignmentId || '',
            assignmentRegisterId: assignmentRegister?.assignmentRegisterId || '',
            assignmentRegisterName: assignmentRegister?.assignmentRegisterName || '',
            scoreAverage: assignmentRegister?.scoreAverage || 0.0,
            scoreInstructor: assignmentRegister?.scoreInstructor || 0.0,
            scoreExaminer: assignmentRegister?.scoreExaminer || 0.0,
            scoreCritical: assignmentRegister?.scoreCritical || 0.0,
            admissionPeriodId: assignmentRegister?.admissionPeriodId || '',
            admissionPeriodName: assignmentRegister?.admissionPeriodName || '',
            status: assignmentRegister?.status || ''
          });
    //Find list assignment with final approve status and have time register in range time period
    if(null != assignmentRegister?.admissionPeriodId && assignmentRegister?.admissionPeriodId !== ''){
      handleSelectListAssignmentByPeriodTime(assignmentRegister?.admissionPeriodId);
    }
        }
      });
      return newSelected;
    });
  };

  // Check if all periodAssignments are selected
  const areAllSelected = 
    Array.isArray(listDataAssignmentRegister) && 
    listDataAssignmentRegister.length > 0 && 
    listDataAssignmentRegister.every((scoreAssignment, idx) => selectedPeriodAssignment.has(scoreAssignment?.scoreAssignmentId ?? idx));
  
  // Check if some (but not all) are selected
  const areSomeSelected = 
    Array.isArray(listDataAssignmentRegister) && 
    listDataAssignmentRegister.length > 0 && 
    selectedPeriodAssignment.size > 0 && 
    !areAllSelected;

  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list period assignment when component mounts
    handleSelectListScoreAssignments(pager.pageNum, pager.pageSize);
    handleSelectListAllPeriodAssignments();
    disableButtonEditDelete(true, true); // Initially disable edit and delete buttons
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Reset checkbox selection when period assignment list changes
    setSelectedPeriodAssignment(new Set());
  }, [listDataAssignmentRegister]);

  // Handlers for modal toggles
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Handler for opening edit modal with period assignment data
  const handleOpenEditPeriodAssignment = () => {
    setIsEditModalOpen(true);
  };

  // Handler for form submit in add period assignment modal
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleCreate(); // Call the create API function
  };

  // Handler for form submit in edit admission period modal
  const handleFormSubmitEditAdmissionPeriod = (event) => {
    event.preventDefault();
    handleUpdate(); // Call the update API function
  };

  //Handle for create admission period API call 
  const handleCreate = async () => {
    try {
      const response = await dispatch(createApi({
        assignmentRegisterId: formData.assignmentRegisterId,
        scoreInstructor: formData.scoreInstructor,
        scoreExaminer: formData.scoreExaminer,
        scoreCritical: formData.scoreCritical
      }));
      if (response.type.endsWith('/fulfilled')) {
        setFormData({
          fileUpload: '',
          studentId: '',
          instructorId: '',
          periodAssignmentId: '',
          assignmentStudentRegisterName: '',
          statusAutoMap: 'N'
        });
        closeAddModal(); // Close modal after submit
        //set timeout to ensure the create API call completes before refreshing the list
        setTimeout(() => {
          handleSelectListScoreAssignments(pager.pageNum, pager.pageSize); // Refresh period assignment list after creation
        }, 500);
      } else {
        // console.error("insert failed:", response.payload);
      }
    } catch (error) {
      // console.error("insert error:", error);
    }
  };

  //Handle for update admission period API call 
  const handleUpdate = async () => {
    try {
      const response = await dispatch(updateApi({
        scoreAssignmentId: formDataEdit.scoreAssignmentId,
        assignmentRegisterId: formDataEdit.assignmentRegisterId,
        scoreInstructor: formDataEdit.scoreInstructor,
        scoreExaminer: formDataEdit.scoreExaminer,
        scoreCritical: formDataEdit.scoreCritical
      }));
      // Check if update was successful
      if (response.type.endsWith('/fulfilled')) {
        // console.log("update successful:", response.payload);
        closeEditModal(); // Close modal after submit
        // set timeout to ensure the update API call completes before refreshing the list
        setTimeout(() => {
          handleSelectListScoreAssignments(pager.pageNum, pager.pageSize); // Refresh period assignment list after update
        }, 500);
      } else {
        // console.error("update failed:", response.payload);
      }
    } catch (error) {
    //   console.error("update error:", error);
    }
  };

  // Handler for role change in add user modal
  const handlePeriodAssignmentChange = (event) => {
      // Directly set the new role value
    const selectedValue = event.target.value;
    setFormData((prev) => ({ ...prev, admissionPeriodId: selectedValue }));
    //Find list assignment with final approve status and have time register in range time period
    if(null != selectedValue && selectedValue !== ''){
      handleSelectListAssignmentByPeriodTime(selectedValue); // Call API to get list assignment register with final approve status and have time register in range time period
    }
    
  };
  // Handler for role change in add user modal
  const handleAssignmentChange = (event) => {
      // Directly set the new role value
    const selectedValue = event.target.value;
    setFormData((prev) => ({ ...prev, assignmentRegisterId: selectedValue }));
    
  };
  // Handler for role change in edit user modal
  const handleAssignmentEditChange = (event) => {
      // Directly set the new role value
    const selectedValue = event.target.value;
    setFormDataEdit((prev) => ({ ...prev, assignmentRegisterId: selectedValue }));
    
  };
  // Handler for role change in edit user modal
  const handlePeriodAssignmentEditChange = (event) => {
      // Directly set the new role value
    const selectedValue = event.target.value;
    setFormDataEdit((prev) => ({ ...prev, admissionPeriodId: selectedValue }));
    //Find list assignment with final approve status and have time register in range time period
    if(null != selectedValue && selectedValue !== ''){
      handleSelectListAssignmentByPeriodTime(selectedValue); // Call API to get list assignment register with final approve status and have time register in range time period
    }
    
  };
  //Handle for select list assignment by period time API call 
  const handleSelectListAssignmentByPeriodTime = async (admissionPeriodId) => {
    try {
      const response = await dispatch(selectListAssignmentByPeriodTimeApi({ 
        admissionPeriodId: admissionPeriodId,
        typeApprove : 1
      }));
      // Check if the API call was successful
      if (response.type.endsWith('/fulfilled')) {
        setListAllAssignmentFinalApprove(response.payload.data.data || []); // Update state with the list of assignments with final approve status
      } else {
        // console.error("select list failed:", response.payload);
      }
    } catch (error) {
    //   console.error("select list error:", error);
    }
  };

  //Handle for delete admission period API call 
  const handleDeleteAdmissionPeriod = async () => {
    try {
      const response = await dispatch(deleteApi({ listData: Array.from(selectedPeriodAssignment) }));
      // Check if delete was successful
      if (response.type.endsWith('/fulfilled')) {
        // console.log("delete successful:", response.payload);
        // set timeout to ensure the delete API call completes before refreshing the list
        setTimeout(() => {
          handleSelectListScoreAssignments(pager.pageNum, pager.pageSize); // Refresh period assignment list after deletion
        }, 500);
      closeDeleteModal();
      } else {
        // console.error("delete failed:", response.payload);
      }
    } catch (error) {
    //   console.error("delete error:", error);
    }
  };

  //Handle for select list score assignment API call 
  const handleSelectListScoreAssignments = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListApiScoresApi({ 
        scoreAssignmentId: null, 
        assignmentRegisterId: null,
        fromDate: null,
        toDate: null,
        pageRequestDto : { pageNum, pageSize }
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataPeriodAssignment will reflect the updated value on next render
      } else {
        // console.error("select list failed:", response.payload);
      }
    } catch (error) {
    //   console.error("select list error:", error);
    }
  };

  //Handle for select list score assignment API call with search
  const handleSelectListScoreAssignmentsSearch = async () => {
    try {
      const response = await dispatch(selectListApiScoresApi({ 
        scoreAssignmentId: formDataSearch.scoreAssignmentId,
        assignmentRegisterId: formDataSearch.assignmentRegisterId, 
        status: formDataSearch.status,
        fromDate: formDataSearch.fromDate,
        toDate: formDataSearch.toDate,
        pageRequestDto : { pageNum: pager.pageNum, pageSize: pager.pageSize }
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataPeriodAssignment will reflect the updated value on next render
      } else {
        // console.error("select list failed:", response.payload);
      }
    } catch (error) {
    //   console.error("select list error:", error);
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
    console.log('Edit form input change:', name, value);
    setFormDataEdit((prev) => ({ ...prev, [name]: value }));
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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách điểm đồ án sinh viên</h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="admission-period-id-search">Mã điểm đồ án sinh viên</label>
                  <input type="text" name="assignmentRegisterId" id="admission-period-id-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã điểm đồ án" onChange={handleInputChangeSearch} />
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
                onClick={handleSelectListScoreAssignmentsSearch}
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
                onClick={openAddModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Thêm mới
              </button>
              <button
                type="button"
                id="edit-period-assignment-button"
                onClick={handleOpenEditPeriodAssignment}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sửa
              </button>
              <button
                type="button"
                id="delete-period-assignment-button"
                onClick={openDeleteModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xóa
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
                      Kỳ học
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên sinh viên
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Điểm quá trình
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Điểm bảo vệ
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Điểm trung bình
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
                      const scoreAssignmentId = assignmentRegister?.scoreAssignmentId;
                      const assignmentRegisterId = assignmentRegister?.assignmentRegisterId;
                      const assignmentRegisterName = assignmentRegister?.assignmentRegisterName;
                      const studentName = assignmentRegister?.studentName;
                      const admissionPeriodId = assignmentRegister?.admissionPeriodId;
                      const admissionPeriodName = assignmentRegister?.admissionPeriodName;
                      const scoreAverage = assignmentRegister?.scoreAverage;
                      const scoreInstructor = assignmentRegister?.scoreInstructor;
                      const scoreExaminer = assignmentRegister?.scoreExaminer;
                      const scoreCritical = assignmentRegister?.scoreCritical;
                      const activeStatus = assignmentRegister?.status === '1' || assignmentRegister?.status === 1 || assignmentRegister?.status === true;

                      return (
                        <tr key={scoreAssignmentId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input 
                                id={`checkbox-${scoreAssignmentId}`} 
                                aria-describedby="checkbox-1" 
                                type="checkbox"
                                checked={selectedPeriodAssignment.has(scoreAssignmentId)}
                                onChange={() => handlePeriodAssignmentCheckboxChange(scoreAssignmentId)}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                              <label htmlFor={`checkbox-${scoreAssignmentId}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {assignmentRegisterName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {admissionPeriodName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {studentName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {scoreInstructor}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                           {scoreExaminer}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {scoreAverage}
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
                  Cập nhật điểm đồ án sinh viên
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
                      <label htmlFor="edit-admission-period-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã điểm đồ án sinh viên</label>
                      <input type="text" name="scoreAssignmentId" value={formDataEdit.scoreAssignmentId || ''} onChange={handleInputChangeEdit} id="edit-admission-period-id"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Mã điểm đồ án sinh viên"  style={{disabled: true}, {backgroundColor: '#adabab'}, {cursor: 'not-allowed'}}/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-admission-period-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kỳ học</label>
                      <select id="category-periodAssignmentId" value={formDataEdit.admissionPeriodId || ''} onChange={handlePeriodAssignmentEditChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listDataPeriodAssignment) && listDataPeriodAssignment.length ? (
                          <>
                        <option value="">Chọn</option>
                        {listDataPeriodAssignment.map((periodAssignment, idx) => {
                          return (
                          <option key={idx} value={periodAssignment.admissionPeriodId}>
                            {periodAssignment.admissionPeriodIdName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">Không tìm thấy</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-admission-period-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đồ án</label>
                      <select id="category-periodAssignmentId" value={formDataEdit.assignmentRegisterId || ''} onChange={handleAssignmentEditChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listAllAssignmentFinalApprove) && listAllAssignmentFinalApprove.length ? (
                          <>
                        <option value="">Chọn</option>
                        {listAllAssignmentFinalApprove.map((assignment, idx) => {
                          return (
                          <option key={idx} value={assignment.assignmentStudentRegisterId}>
                            {assignment.assignmentStudentRegisterName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">{formDataEdit.assignmentRegisterName || ''}</option>)}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category-period-admission-edit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điểm quá trình</label>
                      <input type="text" name="scoreInstructor" value={formDataEdit.scoreInstructor || ''} onChange={handleInputChangeEdit} id="edit-admission-period-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Ghi chú" required/>
                    </div>
                    </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="default-checkbox" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điểm bảo vệ</label>
                      <input type="text" name="scoreExaminer" value={formDataEdit.scoreExaminer || ''} onChange={handleInputChangeEdit} id="category-instructor-update"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder=""   />
                    </div>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                       onClick={handleFormSubmitEditAdmissionPeriod}>Cập nhật</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Add Period Assignment Modal --> */}
      {isAddModalOpen && (
        <div
          onClick={closeAddModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="add-period-assignment-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">
                  Thêm mới điểm đồ án sinh viên
                </h3>
                <button type="button"
                  onClick={closeAddModal}
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
                      <label htmlFor="edit-admission-period-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kỳ học</label>
                      <select id="category-periodAssignmentId" onChange={handlePeriodAssignmentChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listDataPeriodAssignment) && listDataPeriodAssignment.length ? (
                          <>
                        <option value="">Chọn</option>
                        {listDataPeriodAssignment.map((periodAssignment, idx) => {
                          return (
                          <option key={idx} value={periodAssignment.admissionPeriodId}>
                            {periodAssignment.admissionPeriodIdName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">Không tìm thấy</option>)}
                      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category-periodAssignmentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đồ án</label>
                      <select id="category-periodAssignmentId" onChange={handleAssignmentChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        {Array.isArray(listAllAssignmentFinalApprove) && listAllAssignmentFinalApprove.length ? (
                          <>
                        <option value="">Chọn</option>
                        {listAllAssignmentFinalApprove.map((assignment, idx) => {
                          return (
                          <option key={idx} value={assignment.assignmentStudentRegisterId}>
                            {assignment.assignmentStudentRegisterName}
                          </option>
                          );
                        })}
                          </>

                        ) :(
                        <option value="">Không tìm thấy</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category-student" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điểm quá trình</label>
                      <input type="text" name="scoreInstructor" onChange={handleInputChange} id="admission-period-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="file_input"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điểm bảo vệ</label>
                      <input type="text" name="scoreExaminer" onChange={handleInputChange} id="admission-period-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required />
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
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Bạn có chắc chắn xóa điểm đồ án này không?</h3>
                <button
                  onClick={handleDeleteAdmissionPeriod}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                  Chắc chắn
                </button>
                <button
                  onClick={closeDeleteModal}
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

export default ScoreAssignmentManagement;
