import React, { useState, useEffect } from 'react';
import { selectListApi, createApi, updateApi, deleteApi } from './StudentManagementAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../.././App.css';

function StudentManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const listDataStudent = useSelector(state => state.studentManagement.selectList.data);
  const totalRecord = useSelector(state => state.studentManagement.selectList.totalRecord);
  const listDataStudentLoading = useSelector(state => state.studentManagement.selectList.loading);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: ''
  });
  const [formDataEdit, setFormDataEdit] = useState({
    studentId: '',
    email: '',
    phone: '',
    fullName: ''
  });
  const [formDataSearch, setFormDataSearch] = useState({
    studentId: '',
    email: '',
    phone: '',
    fullName: '',
    fromDate: '',
    status: '',
    toDate: '',
    createUser: ''
  });
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10
  });
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListStudents(page, pageSize);
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allStudentIds = new Set(
        listDataStudent?.map((item, idx) => item?.id ?? idx) || []
      );
      setSelectedStudents(allStudentIds);
    } else {
      setSelectedStudents(new Set());
    }
  };

  useEffect(() => {
    handleEnableButtonActions();
  }, [selectedStudents]);

  const handleEnableButtonActions = () => {
    if (selectedStudents != null && selectedStudents.size === 0) {
      disableButtonEditDelete(true, true);
    } else if (selectedStudents != null && selectedStudents.size === 1) {
      disableButtonEditDelete(false, false);
    } else {
      disableButtonEditDelete(true, false);
    }
  };

  const disableButtonEditDelete = (statusEdit, statusDelete) => {
    const editBtn = document.getElementById('edit-student-button');
    const deleteBtn = document.getElementById('delete-student-button');
    if (editBtn) {
      editBtn.disabled = statusEdit;
      if (statusEdit) {
        editBtn.classList.add('button-disabled');
      } else {
        editBtn.classList.remove('button-disabled');
      }
    }
    if (deleteBtn) {
      deleteBtn.disabled = statusDelete;
      if (statusDelete) {
        deleteBtn.classList.add('button-disabled');
      } else {
        deleteBtn.classList.remove('button-disabled');
      }
    }
  };

  const handleStudentCheckboxChange = (studentId) => {
    setSelectedStudents(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(studentId)) {
        newSelected.delete(studentId);
      } else {
        newSelected.add(studentId);
      }
      listDataStudent?.forEach(item => {
        if (item.studentId === studentId || item.id === studentId) {
          setFormDataEdit({
            studentId: item?.studentId || studentId,
            email: item?.email || '',
            phone: item?.phone || '',
            fullName: item?.fullName || ''
          });
        }
      });
      return newSelected;
    });
  };

  const areAllSelected =
    Array.isArray(listDataStudent) &&
    listDataStudent.length > 0 &&
    listDataStudent.every((item, idx) => selectedStudents.has(item?.id ?? idx));

  const areSomeSelected =
    Array.isArray(listDataStudent) &&
    listDataStudent.length > 0 &&
    selectedStudents.size > 0 &&
    !areAllSelected;

  useEffect(() => {
    handleSelectListStudents(pager.pageNum, pager.pageSize);
    disableButtonEditDelete(true, true);
  }, []);

  useEffect(() => {
    setSelectedStudents(new Set());
  }, [listDataStudent]);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleCreate();
    closeAddModal();
    setTimeout(() => {
      handleSelectListStudents(pager.pageNum, pager.pageSize);
    }, 1500);
  };

  const handleFormSubmitEditStudent = (event) => {
    event.preventDefault();
    handleUpdate();
    closeEditModal();
    setTimeout(() => {
      handleSelectListStudents(pager.pageNum, pager.pageSize);
    }, 500);
  };

  const handleCreate = async () => {
    try {
      const response = await dispatch(createApi({
        email: formData.email,
        phone: formData.phone,
        fullName: formData.fullName
      }));
      if (response.type.endsWith('/fulfilled')) {
        setFormData({ email: '', phone: '', fullName: '' });
      }
    } catch (error) {
      console.error('insert error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await dispatch(updateApi({
        studentId: formDataEdit.studentId,
        email: formDataEdit.email,
        phone: formDataEdit.phone,
        fullName: formDataEdit.fullName
      }));
      if (!response.type.endsWith('/fulfilled')) {
        console.error('update failed:', response.payload);
      }
    } catch (error) {
      console.error('update error:', error);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const response = await dispatch(deleteApi({ listData: Array.from(selectedStudents) }));
      if (response.type.endsWith('/fulfilled')) {
        setTimeout(() => {
          handleSelectListStudents(pager.pageNum, pager.pageSize);
        }, 500);
      }
    } catch (error) {
      console.error('delete error:', error);
    }
    closeDeleteModal();
  };

  const handleSelectListStudents = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListApi({
        studentId: '',
        email: '',
        phone: '',
        fullName: '',
        fromDate: '',
        status: '',
        toDate: '',
        createUser: '',
        pageRequestDto: { pageNum, pageSize }
      }));
      if (!response.type.endsWith('/fulfilled')) {
        console.error('select list failed:', response.payload);
      }
    } catch (error) {
      console.error('select list error:', error);
    }
  };

  const handleSelectListStudentsSearch = async () => {
    try {
      const response = await dispatch(selectListApi({
        studentId: formDataSearch.studentId,
        email: formDataSearch.email,
        phone: formDataSearch.phone,
        fullName: formDataSearch.fullName,
        fromDate: formDataSearch.fromDate,
        status: formDataSearch.status,
        toDate: formDataSearch.toDate,
        createUser: formDataSearch.createUser,
        pageRequestDto: { pageNum: pager.pageNum, pageSize: pager.pageSize }
      }));
      if (!response.type.endsWith('/fulfilled')) {
        console.error('select list failed:', response.payload);
      }
    } catch (error) {
      console.error('select list error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChangeEdit = (event) => {
    const { name, value } = event.target;
    setFormDataEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChangeSearch = (event) => {
    const { name, value } = event.target;
    setFormDataSearch(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách sinh viên</h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="student-code-search">Mã sinh viên</label>
                  <input
                    type="text"
                    name="studentId"
                    id="student-code-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã sinh viên"
                    onChange={handleInputChangeSearch}
                  />
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="student-name-search">Tên sinh viên</label>
                  <input
                    type="text"
                    name="fullName"
                    id="student-name-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm tên sinh viên"
                    onChange={handleInputChangeSearch}
                  />
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="student-email-search">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="student-email-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm email"
                    onChange={handleInputChangeSearch}
                  />
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="student-phone-search">Điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    id="student-phone-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm điện thoại"
                    onChange={handleInputChangeSearch}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="sm:flex">
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <button
                type="button"
                onClick={handleSelectListStudentsSearch}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Tìm kiếm
              </button>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                {!listDataStudentLoading && !listDataStudent?.length && <span>Không tìm thấy dữ liệu.</span>}
                {!listDataStudentLoading && listDataStudent?.length > 0 && (
                  <span>{`Tổng số bản ghi: ${totalRecord}`}</span>
                )}
              </div>
            </div>
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
                id="edit-student-button"
                onClick={handleOpenEditModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sửa
              </button>
              <button
                type="button"
                id="delete-student-button"
                onClick={openDeleteModal}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

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
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Mã sinh viên</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Tên sinh viên</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Email</th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {Array.isArray(listDataStudent) && listDataStudent.length ? (
                    listDataStudent.map((student, idx) => {
                      const studentId = student?.studentId || student?.id || idx;
                      const studentName = student?.fullName || student?.studentName || 'N/A';
                      const studentEmail = student?.email || 'N/A';
                      const activeStatus = student?.status === '1' || student?.status === 1 || student?.status === true;
                      return (
                        <tr key={studentId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id={`checkbox-${studentId}`}
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                checked={selectedStudents.has(studentId)}
                                onChange={() => handleStudentCheckboxChange(studentId)}
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label htmlFor={`checkbox-${studentId}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{studentId}</td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{studentName}</td>
                          <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">{studentEmail}</td>
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
                      <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">Không tìm thấy dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <Pagination
          showSizeChanger={false}
          pageSize={pager.pageSize}
          current={pager.pageNum}
          total={totalRecord || 0}
          onChange={_onChangePagination}
          className="mx-auto"
        />
      </div>

      {isEditModalOpen && (
        <div onClick={closeEditModal} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50" id="edit-student-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full h-full max-w-2xl px-4 md:h-auto flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">Cập nhật sinh viên</h3>
                <button type="button" onClick={closeEditModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-student-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mã sinh viên</label>
                      <input type="text" name="studentId" value={formDataEdit.studentId} onChange={handleInputChangeEdit} id="edit-student-code" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Mã sinh viên" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-student-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sinh viên</label>
                      <input type="text" name="fullName" value={formDataEdit.fullName} onChange={handleInputChangeEdit} id="edit-student-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tên sinh viên" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-student-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" value={formDataEdit.email} onChange={handleInputChangeEdit} id="edit-student-email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="edit-student-phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điện thoại</label>
                      <input type="text" name="phone" value={formDataEdit.phone} onChange={handleInputChangeEdit} id="edit-student-phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Điện thoại" required />
                    </div>
                  </div>
                  <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button onClick={handleFormSubmitEditStudent} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cập nhật</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div onClick={closeAddModal} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50" id="add-student-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700 border-gray-200">
                <h3 className="text-xl font-semibold dark:text-white">Thêm mới sinh viên</h3>
                <button type="button" onClick={closeAddModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="student-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên sinh viên</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} id="student-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tên sinh viên" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="student-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} id="student-email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="student-phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Điện thoại</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} id="student-phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Điện thoại" required />
                    </div>
                  </div>
                  <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button onClick={handleFormSubmit} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Thêm mới</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div onClick={closeDeleteModal} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50" id="delete-student-modal">
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex justify-end p-2">
                <button type="button" onClick={closeDeleteModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              <div className="p-6 pt-0 text-center">
                <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Bạn có chắc chắn xóa sinh viên này không?</h3>
                <button onClick={handleDeleteStudent} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">Chắc chắn</button>
                <button onClick={closeDeleteModal} className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Không, hủy bỏ</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentManagement;
