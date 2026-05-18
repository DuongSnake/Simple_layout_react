import React, { useState, useEffect } from 'react';
import { selectListApiMajors, createApi, updateApi, deleteApi } from "./MajorManagementAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../.././App.css';

function MajorManagement() {
  // State for modal visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listDataMajor = useSelector(state => state.majorManagement.selectListApiMajors.data);
  const totalRecord = useSelector(state => state.majorManagement.selectListApiMajors.totalRecord);
  const listDataMajorLoading = useSelector(state => state.majorManagement.selectListApiMajors.loading);

  // State for form data (Add Major modal)
  const [formData, setFormData] = useState({
    majorName: ''
  });

  // State for form data (Edit Major modal)
  const [formDataEdit, setFormDataEdit] = useState({
    majorId: '',
    majorName: ''
  });

  // State for form data (Search Major modal)
  const [formDataSearch, setFormDataSearch] = useState({
    majorId: '',
    majorName: '',
  });

  // State for pagination
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  // State for checkbox selection
  const [selectedMajors, setSelectedMajors] = useState(new Set());
  
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListMajors(page, pageSize);
  };

  // Handler for select all checkbox
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all majors in current page
      const allMajorIds = new Set(
        listDataMajor?.map((major, idx) => major?.id ?? idx) || []
      );
      setSelectedMajors(allMajorIds);
    } else {
      // Deselect all
      setSelectedMajors(new Set());
    }
  };

  //Handle case when change size list selected major
  useEffect(() => {
    handleEnableButtonActions();
  }, [selectedMajors]);

  //Handle case when click button edit or delete but no major selected
  const handleEnableButtonActions = () => {
    if(selectedMajors != null && selectedMajors.size === 0){
      //Disable edit and delete button when no major selected
      disableButtonEditDelete(true, true);
    } else if(selectedMajors != null && selectedMajors.size === 1){
      //Enable edit button and disable delete button when only 1 major selected
      disableButtonEditDelete(false, false);
    }else{
      //Disable edit and enable delete button when multiple majors selected
      disableButtonEditDelete(true, false);
    }
  };

  const disableButtonEditDelete = (statusEdit, statusDelete) => {
    //Set disabled attribute for edit and delete button
    const editBtn = document.getElementById("edit-major-button");
    const deleteBtn = document.getElementById("delete-major-button");
    
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

  // Handler for individual row checkbox
  const handleMajorCheckboxChange = (majorId) => {
    setSelectedMajors((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(majorId)) {
        newSelected.delete(majorId);
      } else {
        newSelected.add(majorId);
      }
      //Set value for edit form when click checkbox of major
      listDataMajor.forEach(major => {
        if (major.majorId === majorId) {
          setFormDataEdit({
            majorId: major?.majorId || '',
            majorName: major?.majorName || ''
          });
        }
      });
      return newSelected;
    });
  };

  // Check if all majors are selected
  const areAllSelected = 
    Array.isArray(listDataMajor) && 
    listDataMajor.length > 0 && 
    listDataMajor.every((major, idx) => selectedMajors.has(major?.id ?? idx));
  
  // Check if some (but not all) are selected
  const areSomeSelected = 
    Array.isArray(listDataMajor) && 
    listDataMajor.length > 0 && 
    selectedMajors.size > 0 && 
    !areAllSelected;

  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list major when component mounts
    handleSelectListMajors(pager.pageNum, pager.pageSize);
    disableButtonEditDelete(true, true); // Initially disable edit and delete buttons
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    console.log('Redux listDataMajor changed:', listDataMajor);
    // Reset checkbox selection when major list changes
    setSelectedMajors(new Set());
  }, [listDataMajor]);

  // Handlers for modal toggles
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Handler for opening edit modal with major data
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Handler for form submit in add major modal
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleCreate(); // Call the create API function
    closeAddModal(); // Close modal after submit
    //set timeout to ensure the create API call completes before refreshing the list
    setTimeout(() => {
      handleSelectListMajors(pager.pageNum, pager.pageSize); // Refresh major list after creation
    }, 1500);
  };

  // Handler for form submit in edit major modal
  const handleFormSubmitEditMajor = (event) => {
    event.preventDefault();
    handleUpdate(); // Call the update API function
    closeEditModal(); // Close modal after submit
    // set timeout to ensure the update API call completes before refreshing the list
    setTimeout(() => {
      handleSelectListMajors(pager.pageNum, pager.pageSize); // Refresh major list after creation
    }, 500);
  };

  //Handle for create major API call 
  const handleCreate = async () => {
    try {
      const response = await dispatch(createApi({ 
        majorName: formData.majorName
       }));
      // Check if create was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("insert successful:", response.payload);
        // Reset form
        setFormData({
          majorName: ''
        });
      } else {
        console.error("insert failed:", response.payload);
      }
    } catch (error) {
      console.error("insert error:", error);
    }
  };

  //Handle for update major API call 
  const handleUpdate = async () => {
    try {
      const response = await dispatch(updateApi({ 
        id: formDataEdit.id,
        majorId: formDataEdit.majorId, 
        majorName: formDataEdit.majorName
       }));
      // Check if update was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("update successful:", response.payload);
      } else {
        console.error("update failed:", response.payload);
      }
    } catch (error) {
      console.error("update error:", error);
    }
  };

  //Handle for delete major API call 
  const handleDeleteMajor = async () => {
    try {
      const response = await dispatch(deleteApi({ listData: Array.from(selectedMajors) }));
      // Check if delete was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("delete successful:", response.payload);
        // set timeout to ensure the delete API call completes before refreshing the list
        setTimeout(() => {
          handleSelectListMajors(pager.pageNum, pager.pageSize); // Refresh major list after deletion
        }, 500);
      } else {
        console.error("delete failed:", response.payload);
      }
    } catch (error) {
      console.error("delete error:", error);
    }
    closeDeleteModal();
  };

  //Handle for select list major API call 
  const handleSelectListMajors = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListApiMajors({ 
        majorId: null, 
        majorName: null,
        status: null,
        pageRequestDto : { pageNum, pageSize }
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataMajor will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };

  //Handle for select list major API call with search
  const handleSelectListMajorsSearch = async () => {
    try {
      const response = await dispatch(selectListApiMajors({ 
        majorId: formDataSearch.majorId, 
        majorName: formDataSearch.majorName,
        status: null,
        pageRequestDto : { pageNum: pager.pageNum, pageSize: pager.pageSize }
       }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listDataMajor will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách chuyên ngành</h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="major-code-search">Mã chuyên ngành</label>
                  <input type="text" name="majorId" id="major-code-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã chuyên ngành" onChange={handleInputChangeSearch} />
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="major-name-search">Tên chuyên ngành</label>
                  <input type="text" name="majorName" id="major-name-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm tên chuyên ngành" onChange={handleInputChangeSearch} />
                </div>
              </form>
            </div>
          </div>
          <div className="sm:flex">   
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <button
                type="button"
                onClick={handleSelectListMajorsSearch}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Tìm kiếm
              </button>   
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                {!listDataMajorLoading && !listDataMajor?.length && <span>Không tìm thấy dữ liệu.</span>}
                {!listDataMajorLoading && listDataMajor?.length > 0 && (
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
                id="edit-major-button"
                onClick={handleOpenEditModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sửa
              </button>
              <button
                type="button"
                id="delete-major-button"
                onClick={openDeleteModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Start table major --> */}
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
                      Mã chuyên ngành
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên chuyên ngành
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {Array.isArray(listDataMajor) && listDataMajor.length ? (
                    listDataMajor.map((major, idx) => {
                      const majorId = major?.majorId;
                      const majorName = major?.majorName;
                      const activeStatus = major?.status === '1' || major?.status === 1 || major?.status === true;

                      return (
                        <tr key={majorId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input 
                                id={`checkbox-${majorId}`} 
                                aria-describedby="checkbox-1" 
                                type="checkbox"
                                checked={selectedMajors.has(majorId)}
                                onChange={() => handleMajorCheckboxChange(majorId)}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                              <label htmlFor={`checkbox-${majorId}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {majorId}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {majorName}
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
      {/* <!-- End table major --> */}

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

      {/* <!-- Edit Major Modal --> */}
      {isEditModalOpen && (
        <div
          onClick={closeEditModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="edit-major-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full max-w-2xl px-4 md:h-auto flex items-center justify-center">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">
                  Cập nhật chuyên ngành
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
                      <label htmlFor="edit-major-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã chuyên ngành</label>
                      <input type="text" name="majorId" value={formDataEdit.majorId} onChange={handleInputChangeEdit} id="edit-major-code"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Mã chuyên ngành" required/>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-major-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chuyên ngành</label>
                      <input type="text" name="majorName" value={formDataEdit.majorName} onChange={handleInputChangeEdit} id="edit-major-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tên chuyên ngành" required/>
                    </div>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                       onClick={handleFormSubmitEditMajor}>Cập nhật</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Add Major Modal --> */}
      {isAddModalOpen && (
        <div
          onClick={closeAddModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="add-major-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl px-4 md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">
                  Thêm mới chuyên ngành
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
                      <label htmlFor="major-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên chuyên ngành</label>
                      <input type="text" name="majorName" value={formData.majorName} onChange={handleInputChange} id="major-name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Tên chuyên ngành" required />
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

      {/* <!-- Delete Major Modal --> */}
      {isDeleteModalOpen && (
        <div
          onClick={closeDeleteModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          id="delete-major-modal">
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
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Bạn có chắc chắn xóa chuyên ngành này không?</h3>
                <button
                  onClick={handleDeleteMajor}
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

export default MajorManagement;
