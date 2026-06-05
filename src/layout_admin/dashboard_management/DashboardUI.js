
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectListTotalRecordsByYearApi, selectListTop5InstructorByYearApi, selectListTop5PeriodByYearApi } from "./DashboardAPI";
import { DatePicker, Pagination } from 'antd';
import dayjs from "dayjs";
import 'antd/dist/reset.css';
import '../.././App.css';
import { RESPONSE_YEAR_FORMAT}  from '../../config/constant/Constants';

function Dashboard() {
  const dispatch = useDispatch();
  const [rangeDateUpdate, setRangeDateUpdate] = useState(new Date().getFullYear());
  const listTotalRecrodAll = useSelector(state => state.reportYear.selectAllTotalRecordByYear.data);
  const listTop5Instructors = useSelector(state => state.reportYear.selectTop5InstructorByYear.data);
  const listTop5Periods = useSelector(state => state.reportYear.selectTop5PeriodByYear.data);
  //Handle for select list total records API call 
  const handleSelectListTotalRecrodAll = async () => {
    try {
      const response = await dispatch(selectListTotalRecordsByYearApi(null));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listTotalRecrodAll will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };

  //Handle for select list top 5 instructors API call 
  const handleSelectListTop5InstructorByYear = async (year) => {
    try {
      const valueYear = year === null ? new Date().getFullYear() : year;
      const response = await dispatch(selectListTop5InstructorByYearApi({ yearQuery: valueYear }));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listTotalRecrodAll will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };

  //Handle for select list top 5 periods API call 
  const handleSelectListTop5PeriodByYear = async () => {
    try {
      const response = await dispatch(selectListTop5PeriodByYearApi(null));
      if (response.type.endsWith('/fulfilled')) {
        // Redux selector listTotalRecrodAll will reflect the updated value on next render
      } else {
        console.error("select list failed:", response.payload);
      }
    } catch (error) {
      console.error("select list error:", error);
    }
  };

  //Handle for change date insert
  const onChangeDateUpdate = (date, dateString) => {
    if(null != date){
      const yearNumber = date.year();
    setRangeDateUpdate(yearNumber);
    handleSelectListTop5InstructorByYear(yearNumber);
    }else{
    setRangeDateUpdate(null);
    handleSelectListTop5InstructorByYear(null);
    }
    }; 

  // useEffect to handle side effects, e.g., logging button clicks or fetching data
  useEffect(() => {
    //Select list major when component mounts
    handleSelectListTotalRecrodAll();
    handleSelectListTop5InstructorByYear(new Date().getFullYear());
    handleSelectListTop5PeriodByYear();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="px-4 pt-6">
      <div className="grid gap-4 xl:grid-cols-3 mb-6">
        {Array.isArray(listTotalRecrodAll) && listTotalRecrodAll.length ? (
          listTotalRecrodAll.map((record, idx) => {
            const totalStudents = record?.totalValue || 0;
            const totalName = record?.totalName;
            let labelName = "";
            if (totalName === 'TOTAL_STUDENT') {
              labelName = "Tổng số sinh viên đăng ký";
            } else if (totalName === 'TOTAL_ASSIGNMENT') {
              labelName = "Tổng số đồ án đăng ký";
            } else if (totalName === 'TOTAL_FILE_UPLOAD') {
              labelName = "Tổng só tệp tin đã tải lên";
            }
            return (
              <>
                <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{labelName}</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{totalStudents}</p>
                </div>
              </>
            );
          })
        ) : (
          <>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tổng số sinh viên đăng ký</p>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Không tìm thấy dữ liệu</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tổng số đồ án đăng ký</p>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Không tìm thấy dữ liệu</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Tổng só tệp tin đã tải lên</p>
              <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">Không tìm thấy dữ liệu</p>
            </div>
          </>
        )}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="flex min-h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Top kỳ học có số lượng sinh viên nhiều nhất</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {Array.isArray(listTop5Periods) && listTop5Periods.length ? (
                listTop5Periods.map((period, idx) => {
                  const admissionPeriodId = period?.admissionPeriodId || idx;
                  const admissionPeriodName = period?.admissionPeriodName;
                  const totalStudent = period?.totalAssignment || 0;
                  return (
                    <>
                      <div key={admissionPeriodId} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{admissionPeriodName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{totalStudent}</p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">

                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Không tìm thấy dữ liêu</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex min-h-full flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Top giáo viên hướng dẫn nhiều nhất năm</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {Array.isArray(listTop5Instructors) && listTop5Instructors.length ? (
                listTop5Instructors.map((instructor, idx) => {
                  const instructorId = instructor?.instructorId || idx;
                  const instructorName = instructor?.instructorName;
                  const totalStudent = instructor?.totalStudent || 0;
                  return (
                    <>
                      <div key={instructorId} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{instructorName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{totalStudent}</p>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">

                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Không tìm thấy dữ liêu</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <DatePicker picker="year" defaultValue={dayjs()}   onChange={onChangeDateUpdate}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard;