import React, { useState, useEffect } from 'react';
import { selectListStudentRegisterAnalystApi, downloadFileAssignmentProcessApi } from "./StudentRegisterAnalystAPI";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from 'antd';
import 'antd/dist/reset.css';
import '../../../../src/App.css';
import {formatDateTime} from '../../../config/utils/FunctionGlobal';
import {STATUS_MAP_USING} from '../../../config/constant/Constants'
import { selectAllInstructorApi } from "../../user_management/UserManagementAPI";

function StudentRegisterAnalyst() {
  const dispatch = useDispatch();
  const listDataStudentRegisterAnalyst = useSelector(state => state.reportAnalyst.selectListStudentRegisterAnalyst.data);
  const totalRecord = useSelector(state => state.reportAnalyst.selectListStudentRegisterAnalyst.totalRecord);
  const listDataStudentRegisterAnalystLoading = useSelector(state => state.reportAnalyst.selectListStudentRegisterAnalyst.loading);
  const listAllInstructors = useSelector(state => state.userManagement.selectAllInstructors.data);
  const [listStatusUse, setListStatusUse] = useState(STATUS_MAP_USING);
  // State for form data (Search Major modal)
  const [formDataSearch, setFormDataSearch] = useState({
    studentId: null,
    instructorId: null,
    admissionPeriod: null,
    statusMapping: null,
    fromDate: null,
    toDate: null
  });

  // State for pagination
  const [pager, setPager] = useState({
    pageNum: 1,
    pageSize: 10,
  });

  
  const _onChangePagination = (page, pageSize) => {
    setPager({ ...pager, pageNum: page });
    handleSelectListStudentRegisterAnalyst(page, pageSize);
  };


    //Handle case download input upload will store new attribute in object(logic upload file)
    const handleDownloadFile = async () => {
    try {

        const response = await downloadFileAssignmentProcessApi({
    studentId: formDataSearch.studentId,
    instructorId: formDataSearch.instructorId,
    admissionPeriod: formDataSearch.admissionPeriod,
    statusMapping: formDataSearch.statusMapping,
    fromDate: formDataSearch.fromDate,
    toDate: formDataSearch.toDate
        });
        const blob = new Blob([response.data]);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        let nowDate = new Date();
        let stringFormatTime = formatDateTime(nowDate);
        let nameFile = "danh_sach_sinh_vien_"+stringFormatTime+".xlsx";

        link.href = url;

        link.download = nameFile;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error("Download file error:", error);

    }
};

  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list major when component mounts
    handleSelectListStudentRegisterAnalyst(pager.pageNum, pager.pageSize);
    handleSelectListAllInstructors();
  }, []); // Empty dependency array means this runs once on mount


  //Handle for select list major API call 
  const handleSelectListStudentRegisterAnalyst = async (pageNum, pageSize) => {
    try {
      const response = await dispatch(selectListStudentRegisterAnalystApi({ 
    studentId: null,
    instructorId: null,
    admissionPeriod: null,
    statusMapping: null,
    fromDate: null,
    toDate: null,
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
  const handleSelectListStudentRegisterAnalystSearch = async () => {
    try {
      const response = await dispatch(selectListStudentRegisterAnalystApi({ 
    studentId: formDataSearch.studentId,
    instructorId: formDataSearch.instructorId,
    admissionPeriod: formDataSearch.admissionPeriod,
    statusMapping: formDataSearch.statusMapping,
    fromDate: formDataSearch.fromDate,
    toDate: formDataSearch.toDate,
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

    //Handle for select list all instructors API call 
  const handleSelectListAllInstructors = async () => {
    try {
        const response = await dispatch(selectAllInstructorApi());
        if (response.type.endsWith('/fulfilled')) {
          // console.log("select all majors successful payload:", response.payload);
        } else {
          console.error("select all majors failed:", response.payload);
        }
      } catch (error) {
        console.error("select all majors error:", error);
      }
    };

  // Handler for instructor id change in edit user modal
  const handleInstructorChange = (event) => {
      // Directly set the new instructor id value
    const selectedValue = event.target.value;
      setFormDataSearch((prev) => ({ ...prev, instructorId: selectedValue }));
  };

  // Handler for instructor id change in edit user modal
  const handleStatusMappingChange = (event) => {
      // Directly set the new instructor id value
    const selectedValue = event.target.value;
      setFormDataSearch((prev) => ({ ...prev, statusMapping: selectedValue }));
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
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Danh sách sinh viên</h1>
          </div>
          <div className="sm:flex">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:mb-0 dark:divide-gray-700">
              <form className="lg:pr-3">
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="student-id-search">Mã sinh viên</label>
                  <input type="text" name="studentId" id="student-id-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm mã sinh viên" onChange={handleInputChangeSearch} />
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="instructor-id-search">Tên giảng viên</label>
                      <div className="col-span-6 sm:col-span-3">
                        <select id="category-instructor" onChange={handleInstructorChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          {Array.isArray(listAllInstructors) && listAllInstructors.length ? (
                            <>
                              <option value="">Chọn tất cả</option>
                              {listAllInstructors.map((instructor, idx) => {
                                return (
                                  <option key={idx} value={instructor.id}>
                                    {instructor.fullName}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <option value="">Không tìm thấy</option>
                          )}
                        </select>
                      </div>
                </div>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <label htmlFor="instructor-id-search">Phân công giảng viên hướng dẫn</label>
                      <div className="col-span-6 sm:col-span-3">
                        <select id="category-instructor" onChange={handleStatusMappingChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                          {Array.isArray(listStatusUse) && listStatusUse.length ? (
                            <>
                              <option value="">Chọn tất cả</option>
                              {listStatusUse.map((instructor, idx) => {
                                return (
                                  <option key={idx} value={instructor.val}>
                                    {instructor.text}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            <option value="">Không tìm thấy</option>
                          )}
                        </select>
                      </div>
                </div>
              </form>
            </div>
          </div>
          <div className="sm:flex">   
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <button
                type="button"
                onClick={handleSelectListStudentRegisterAnalystSearch}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Tìm kiếm
              </button>   
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                {!listDataStudentRegisterAnalystLoading && !listDataStudentRegisterAnalyst?.length && <span>Không tìm thấy dữ liệu.</span>}
                {!listDataStudentRegisterAnalystLoading && listDataStudentRegisterAnalyst?.length > 0 && (
                  <span>{`Tổng số bản ghi: ${totalRecord}`}</span>
                )}
              </div>
            </div>
            {/* Button insert */}
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                onClick={handleDownloadFile}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Xuất excel
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
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Mã sinh viên
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên sinh viên
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Email sinh viên
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Mã giảng viên hướng dẫn
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên giảng viên hướng dẫn
                    </th>
                    <th scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Tên giảng viên phản biện
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {Array.isArray(listDataStudentRegisterAnalyst) && listDataStudentRegisterAnalyst.length ? (
                    listDataStudentRegisterAnalyst.map((student, idx) => {
                      const studentId = student?.studentId;
                      const studentName = student?.studentName;
                      const studentEmail = student?.studentEmail;
                      const instructorId = student?.instructorId;
                      const instructorName = student?.instructorName;
                      const instructorEmail = student?.instructorEmail;
                      const criticalName = student?.criticalName;
                      const criticalId = student?.criticalId;

                      return (
                        <tr key={studentId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {studentId}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {studentName}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {studentEmail}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {instructorId !== null ? instructorId : null}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {instructorId !== null ? instructorName : 'Chưa phân công'}
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                            {criticalId !== null ? criticalName : 'Chưa phân công'}
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

    </>
  );
}

export default StudentRegisterAnalyst;
