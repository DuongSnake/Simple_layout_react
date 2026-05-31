import React, { useState, useEffect } from 'react';
import { selectListAssignmentProcessApi, insertListFileAssignmentProcessApi, updateListFileAssignmentProcessApi
    , selectListFileAssignmentProcessApi, downloadFileAssignmentProcessApi} from "./AssignmentProcessUploadManagementAPI";
import { findUserIdByUsername } from "../../layout_login/admin_layout/AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import dayjs from "dayjs";
import 'antd/dist/reset.css';
import '../.././App.css';
import { APP_DATE_FORMAT, USER_NAME_USER } from '../../config/constant/Constants';
function AssignmentProcessUploadManagementLayout() {
    // State for modal visibility
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();
    const listDataAssignmentRegister = useSelector(state => state.assignmentProcessUploadManagement.selectListAssignmentProcess.data);
    const listDataFileAssignmentRegister = useSelector(state => state.assignmentProcessUploadManagement.selectListFileAssignmentProcess.data);
    const totalRecord = useSelector(state => state.assignmentProcessUploadManagement.selectListAssignmentProcess.totalRecord);
    const listDataAssignmentStudentRegisterLoading = useSelector(state => state.assignmentProcessUploadManagement.selectListAssignmentProcess.loading);
    const userIdGetFromAccountLogin = useSelector(state => state.authentication.findUserId.data);
    const [selectedFileAdd, setSelectedFileAdd] = useState(null);
    //logic upload file
    const [listFileUpload, setListFileUpload] = useState([]);
    const [deletedFileIds, setDeletedFileIds] = useState([]);

    // State for form data (Add PeriodAssignment modal)
    const [formData, setFormData] = useState({
        assignmentStudentRegisterId: '',
        listFile: []
    });

    // State for form data (Edit PeriodAssignment modal)
    const [formDataEdit, setFormDataEdit] = useState({
        assignmentStudentRegisterId: '',
        listFile: []
    });

    // State for form data (Search PeriodAssignment modal)
    const [formDataSearch, setFormDataSearch] = useState({
        assignmentStudentRegisterId: '',
        assignmentStudentRegisterName: '',
        status: '',
        fromDate: '',
        regUser: '',
        toDate: ''
    });

    // State for pagination
    const [pager, setPager] = useState({
        pageNum: 1,
        pageSize: 10,
    });

    // State for checkbox selection
    const [selectedAssignmentProcess, setSelectedAssignmentProcess] = useState(new Set());

    const _onChangePagination = (page, pageSize) => {
        setPager({ ...pager, pageNum: page });
        handleSelectLisAssignmentProcess(page, pageSize, userIdGetFromAccountLogin.id);
    };

    // Handler for select all checkbox
    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            // Select all periodAssignments in current page
            const allPeriodAssignmentIds = new Set(
                listDataAssignmentRegister?.map((assignmentProcess, idx) => assignmentProcess?.assignmentStudentRegisterId ?? idx) || []
            );
            setSelectedAssignmentProcess(allPeriodAssignmentIds);
        } else {
            // Deselect all
            setSelectedAssignmentProcess(new Set());
        }
    };
    //Handle case add new input upload will store new attribute in object(logic upload file)
    const handleAddNewFileInput = () => {
        setListFileUpload(prev => [
            ...prev,
            {
                fileId: null,
                oldFileName: '',
                file: null,
                isNew: true
            }
        ]);
    };
    //Handle case delete input upload will store new attribute in object(logic upload file)
    const handleDeleteFile = (index, fileId) => {

        if (fileId) {
            setDeletedFileIds(prev => [...prev, fileId]);
        }

        setListFileUpload(prev =>
            prev.filter((_, idx) => idx !== index)
        );
    };
    //Handle case download input upload will store new attribute in object(logic upload file)
    const handleDownloadFile = async (fileId, fileName) => {
    try {

        const response = await downloadFileAssignmentProcessApi(fileId);
        const blob = new Blob([response.data]);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error("Download file error:", error);

    }
};

    //Handle case when change size list selected periodAssignment
    useEffect(() => {
        handleEnableButtonActions();
    }, [selectedAssignmentProcess, userIdGetFromAccountLogin]);
    //Handle case when change size list file assignment process(logic upload file)
    useEffect(() => {
        console.log('listDataFileAssignmentRegister changed:', listDataFileAssignmentRegister);
        if (Array.isArray(listDataFileAssignmentRegister)) {
            const mappedFiles = listDataFileAssignmentRegister.map(item => ({
                fileId: item.fileId,
                oldFileName: item.fileName,
                file: null,
                isNew: false
            }));
            setListFileUpload(mappedFiles);
        }else{
            setListFileUpload([]);
        }
    }, [listDataFileAssignmentRegister]);

    //Handle case when click button edit or delete but no periodAssignment selected
    const handleEnableButtonActions = () => {
        if (selectedAssignmentProcess != null && selectedAssignmentProcess.size === 0) {
            //Disable edit and delete button when no periodAssignment selected
            disableButtonEditDelete(true, true);
        } else if (selectedAssignmentProcess != null && selectedAssignmentProcess.size === 1) {
            //Enable edit button and disable delete button when only 1 periodAssignment selected
            disableButtonEditDelete(false, false);
        } else {
            //Disable edit and enable delete button when multiple periodAssignments selected
            disableButtonEditDelete(true, false);
        }
    };

    const disableButtonEditDelete = (statusEdit, statusDelete) => {
        //Set disabled attribute for edit and delete button
        const editBtn = document.getElementById("edit-period-assignment-button");
        const deleteBtn = document.getElementById("delete-period-assignment-button");
        const reserveBtn = document.getElementById("reserve-assignment-button");

        if (editBtn) {
            editBtn.disabled = statusEdit;
            if (statusEdit) {
                editBtn.classList.add("button-disabled");
            } else {
                editBtn.classList.remove("button-disabled");
            }
        }

        if (deleteBtn) {
            deleteBtn.disabled = statusDelete;
            if (statusDelete) {
                deleteBtn.classList.add("button-disabled");
            } else {
                deleteBtn.classList.remove("button-disabled");
            }
        }

        if (reserveBtn) {
            reserveBtn.disabled = statusDelete;
            if (statusDelete) {
                reserveBtn.classList.add("button-disabled");
            } else {
                reserveBtn.classList.remove("button-disabled");
            }
        }
    };

    //Handle for select list all students API call 
    const handleSelectUserIdGetFromAccountLogin = async () => {
        try {
            const valueUserName = sessionStorage.getItem(USER_NAME_USER);
            const response = await dispatch(findUserIdByUsername({ userName: valueUserName }));
            if (response.type.endsWith('/fulfilled')) {
                //   console.log("select all userId successful payload:", response.payload);
                let valueStudentId = response.payload.id;
        //Select list assignment process when component mounts
        handleSelectLisAssignmentProcess(pager.pageNum, pager.pageSize, valueStudentId);
            } else {
                console.error("select userId failed:", response.payload);
            }
        } catch (error) {
            console.error("select userId error:", error);
        }
    };

    // Handler for individual row checkbox
    const handlePeriodAssignmentCheckboxChange = (periodAssignmentId) => {
        setSelectedAssignmentProcess((prevSelected) => {
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
                        statusAutoMap: assignmentRegister?.statusAutoMap || '',
                        oldValueId: assignmentRegister?.oldValueId || ''
                    });
                }
            });
            handleSelectListFileAssignmentProcess(periodAssignmentId); // Fetch files for the selected assignment
            return newSelected;
        });
    };

    // Check if all periodAssignments are selected
    const areAllSelected =
        Array.isArray(listDataAssignmentRegister) &&
        listDataAssignmentRegister.length > 0 &&
        listDataAssignmentRegister.every((periodAssignment, idx) => selectedAssignmentProcess.has(periodAssignment?.assignmentStudentRegisterId ?? idx));

    // Check if some (but not all) are selected
    const areSomeSelected =
        Array.isArray(listDataAssignmentRegister) &&
        listDataAssignmentRegister.length > 0 &&
        selectedAssignmentProcess.size > 0 &&
        !areAllSelected;

    // useEffect to handle side effects, e.g., logging button clicks or fetching data
    useEffect(() => {
        //Select list all majors when component mounts
        handleSelectUserIdGetFromAccountLogin();
        disableButtonEditDelete(true, true); // Initially disable edit and delete buttons
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        console.log('Redux assignment process changed:', listDataAssignmentRegister);
        // Reset checkbox selection when assignment process list changes
        setSelectedAssignmentProcess(new Set());
    }, [listDataAssignmentRegister]);

    // Handlers for modal toggles
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    // Handler for opening edit modal with period assignment data
    const handleOpenEditPeriodAssignment = () => {
        setIsEditModalOpen(true);
    };

    // Handler for form submit in add period assignment modal
    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleCreate(); // Call the create API function
        closeAddModal(); // Close modal after submit
        // set timeout to ensure the create API call completes before refreshing the list
        setTimeout(() => {
            handleSelectLisAssignmentProcess(pager.pageNum, pager.pageSize, userIdGetFromAccountLogin.id); // Refresh period assignment list after creation
        }, 2500);
    };

    // Handler for form submit in edit admission period modal
    const handleFormSubmitEditAdmissionPeriod = async (event) => {
        event.preventDefault();
        await handleUpdate(); // Call the update API function
        // closeEditModal(); // Close modal after submit
        // // set timeout to ensure the update API call completes before refreshing the list
        // setTimeout(() => {
        //   handleSelectLisAssignmentProcess(pager.pageNum, pager.pageSize); // Refresh period assignment list after update
        // }, 500);
    };

    //Handle for create admission period API call 
    const handleCreate = async () => {
        const formData123 = new FormData();
        if (formData.fileUpload instanceof File) {
            formData123.append("listFile", formData.fileUpload);
        }
        formData123.append("assignmentStudentRegisterId", formData.assignmentStudentRegisterId || "");
        try {
            const response = await dispatch(insertListFileAssignmentProcessApi(formData123));
            if (response.type.endsWith('/fulfilled')) {
                setFormData({
                    fileUpload: '',
                    assignmentStudentRegisterId: ''
                });
                setSelectedFileAdd(null);
            } else {
                // console.error("insert failed:", response.payload);
            }
        } catch (error) {
            // console.error("insert error:", error);
        }
    };

    //Handle for update admission period API call(logic upload file)
const handleUpdate = async () => {

  try {

    const formData123 = new FormData();

    formData123.append(
      "assignmentStudentRegisterId",
      formDataEdit.assignmentStudentRegisterId || 0
    );

    // danh sách file delete
    formData123.append(
      "deletedFileIds",
      JSON.stringify(deletedFileIds)
    );

    // append toàn bộ file
    listFileUpload.forEach((item, index) => {

      // file mới upload
      if (item.file instanceof File) {

        formData123.append(
          "listFile",
          item.file
        );

        formData123.append(
          `fileIds`,
          item.fileId || ''
        );
      }
    });

    const response = await dispatch(
      updateListFileAssignmentProcessApi(formData123)
    );

    if (response.type.endsWith('/fulfilled')) {

      closeEditModal();

      handleSelectLisAssignmentProcess(
        pager.pageNum,
        pager.pageSize,
        userIdGetFromAccountLogin.id
      );
    }

  } catch (error) {

    console.error(error);

  }
};

    // Handler for role change in add user modal
    const handlePeriodAssignmentChange = (event) => {
        // Directly set the new role value
        const selectedValue = event.target.value;
        console.log('Selected period assignment ID:', selectedValue);
        setFormData((prev) => ({ ...prev, periodAssignmentId: selectedValue }));
    };

    // Handler for admission period change in add user modal
    const handleAdmissionPeriodChange = (event) => {
        // Directly set the new admission period value
        const selectedValue = event.target.value;
        console.log('Selected admission period ID:', selectedValue);
        setFormData((prev) => ({ ...prev, admissionPeriodId: selectedValue }));
    };

    //Handle for select list assignment process API call 
    const handleSelectLisAssignmentProcess = async (pageNum, pageSize, studentId) => {
        try {
            const response = await dispatch(selectListAssignmentProcessApi({
                assignmentStudentRegisterId: null,
                assignmentStudentRegisterName: null,
                fromDate: null,
                toDate: null,
                status: null,
                regUser: null,
                studentId: studentId,
                pageRequestDto: { pageNum, pageSize }
            }));
            if (response.type.endsWith('/fulfilled')) {
                // Redux selector selectListAssignmentProcessApi will reflect the updated value on next render
            } else {
                // console.error("select list failed:", response.payload);
            }
        } catch (error) {
            //   console.error("select list error:", error);
        }
    };

    //Handle for select list file assignment process API call 
    const handleSelectListFileAssignmentProcess = async (assignmentStudentRegisterId) => {
        try {
            const response = await dispatch(selectListFileAssignmentProcessApi({
                assignmentStudentRegisterId: assignmentStudentRegisterId
            }));
            if (response.type.endsWith('/fulfilled') && response.payload != null) {
                // Redux selector selectListAssignmentProcessApi will reflect the updated value on next render
                
            } else {
                // console.error("select list failed:", response.payload);
            }
        } catch (error) {
            //   console.error("select list error:", error);
        }
    };

    //Handle for select list assignment process API call with search
    const handleSelectLisAssignmentProcessSearch = async () => {
        try {
            const response = await dispatch(selectListAssignmentProcessApi({
                assignmentStudentRegisterId: formDataSearch.assignmentStudentRegisterId,
                assignmentStudentRegisterName: formDataSearch.assignmentStudentRegisterName,
                fromDate: formDataSearch.fromDate,
                toDate: formDataSearch.toDate,
                status: formDataSearch.status,
                regUser: userIdGetFromAccountLogin.id || null,
                studentId: userIdGetFromAccountLogin.id,
                pageRequestDto: { pageNum: pager.pageNum, pageSize: pager.pageSize }
            }));
            if (response.type.endsWith('/fulfilled')) {
                // Redux selector selectListAssignmentProcessApi will reflect the updated value on next render
            } else {
                // console.error("select list failed:", response.payload);
            }
        } catch (error) {
            //   console.error("select list error:", error);
        }
    };
    // Handle file selection(logic upload file)
    const handleFileChangeUpdate = (event, index) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }
        setListFileUpload(prev => {
            const clone = [...prev];
            clone[index] = {
                ...clone[index],
                file
            };
            return clone;
        });
    };

    // Handler for form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handler for edit form input changes
    const handleInputChangeEdit = (event) => {
        console.log('Edit form input change:', event.target.name, event.target.value);
        const { name, value } = event.target;
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
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách đồ án sinh viên đã duyệt</h1>
                    </div>
                    <div className="sm:flex">
                        <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
                            <form className="lg:pr-3">
                                <div className="relative mt-1 lg:w-64 xl:w-96">
                                    <label htmlFor="admission-period-id-search">Mã đồ án sinh viên đã duyệt</label>
                                    <input type="text" name="assignmentRegisterId" id="admission-period-id-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tìm kiếm mã đồ án đã duyệt" onChange={handleInputChangeSearch} />
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
                                onClick={handleSelectLisAssignmentProcessSearch}
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
                                Sửa
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
                                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                checked={selectedAssignmentProcess.has(assignmentStudentRegisterId)}
                                                                onChange={() => handlePeriodAssignmentCheckboxChange(assignmentStudentRegisterId)}
                                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
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
                    <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full md:h-auto flex items-center justify-center">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800" style={{minWidth: '1000px'}}>
                            {/* <!-- Modal header --> */}
                            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                                <h3 className="text-xl font-semibold dark:text-white">
                                    Cập nhật tệp tin đồ án sinh viên đã duyệt
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
                                            <label htmlFor="edit-admission-period-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã đồ án sinh viên đã duyệt</label>
                                            <input type="text" name="assignmentStudentRegisterId" value={formDataEdit.assignmentStudentRegisterId} onChange={handleInputChangeEdit} id="edit-admission-period-id"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Mã đồ án sinh viên đã duyệt" style={{ disabled: true }, { backgroundColor: '#adabab' }, { cursor: 'not-allowed' }} />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="edit-admission-period-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đồ án</label>
                                            <input type="text" name="assignmentStudentRegisterName" value={formDataEdit.assignmentStudentRegisterName} onChange={handleInputChangeEdit} id="edit-admission-period-name"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Tên đồ án" style={{ disabled: true }, { backgroundColor: '#adabab' }, { cursor: 'not-allowed' }} />
                                        </div>
                                    </div>
                                    {/* New element */}
                                    <div className="grid grid-cols-6 gap-6">
                                        {/* start content to show and hide by status auto map */}
                                        <div className="col-span-6 sm:col-span-3" style={{ disabled: true }, { backgroundColor: '#adabab' }, { cursor: 'not-allowed' }}>
                                            <label htmlFor="category-instructor-update" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên giảng viên</label>
                                            <input type="text" name="category-instructor-update" value={formDataEdit.instructorName} id="category-instructor-update"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="" style={{ disabled: true }, { backgroundColor: '#adabab' }, { cursor: 'not-allowed' }}  readOnly={true}/>
                                        </div>
                                        {/* end content to show and hide by status auto map */}
                                        
                                    {/* show button add file */}
                                    <div className="col-span-6">
                                        <button
                                            type="button"
                                            onClick={handleAddNewFileInput}
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            + Thêm file
                                        </button>
                                    </div>
                                    </div>
                                    {/* show the list file upload change */}
                                    <div className="grid">

                                        {listFileUpload.map((item, index) => (

                                            <div key={`${item.fileId}-${index}`} className="grid grid-cols-12 gap-4 border p-4 rounded-lg">
                                                {/* upload input */}
                                                <div className="col-span-3">
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Upload file
                                                    </label>

                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleFileChangeUpdate(e, index)}
                                                        className="block text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                                    />

                                                    {/* old file */}
                                                    {item.oldFileName && (
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            File cũ: {item.oldFileName}
                                                        </p>
                                                    )}

                                                    {/* new file */}
                                                    {item.file && (
                                                        <p className="mt-1 text-sm text-green-600">
                                                            File mới: {item.file.name}
                                                        </p>
                                                    )}
                                                </div>
                                                {/* delete */}
                                                <div className="col-span-2 flex items-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteFile(index, item.fileId)}
                                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                        style={{marginRight: '20px'}}>
                                                        Xóa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDownloadFile(item.fileId, item.oldFileName)}
                                                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    >
                                                        Tải xuống
                                                    </button>
                                                </div>

                                            </div>
                                        ))}

                                    </div>
                                    {/* <!-- Modal footer --> */}
                                    <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700" style={{paddingLeft: '0px'}}>
                                        <button
                                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                             onClick={handleFormSubmitEditAdmissionPeriod}> Cập nhật
                                        </button>
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
                                    Thêm mới đồ án sinh viên đã duyệt
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
                                            <label htmlFor="admission-period-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đồ án</label>
                                            <input type="text" name="assignmentStudentRegisterName" onChange={handleInputChange} id="admission-period-name"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                placeholder="Tên đồ án" required />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="category-periodAssignmentId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kỳ hạn đồ án</label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tệp tài liệu</label>
                                            <input class="cursor-pointer bg-neutral-secondary-medium border border-default-medium 
                      text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full 
                      shadow-xs placeholder:text-body" id="file_input" type="file" readOnly={true} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="default-checkbox" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tự động map giảng viên hướng dẫn</label>
                                        </div>
                                        {/* end content to show and hide by status auto map */}
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
        </>
    );
}

export default AssignmentProcessUploadManagementLayout;
