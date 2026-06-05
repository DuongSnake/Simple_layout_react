import { createSlice } from '@reduxjs/toolkit';
import { selectListTotalRecordsByYearApi, selectListTop5PeriodByYearApi, selectListTop5InstructorByYearApi } from '../../layout_admin/dashboard_management/DashboardAPI';

const initialState = {
  selectAllTotalRecordByYear: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectTop5PeriodByYear: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectTop5InstructorByYear: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  }
}

const reportYearSlice = createSlice({
  name: 'reportYear',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List total record by year handlers
      .addCase(selectListTotalRecordsByYearApi.pending, (state) => {
        state.selectAllTotalRecordByYear.loading = true;
        state.selectAllTotalRecordByYear.error = null;
      })
      .addCase(selectListTotalRecordsByYearApi.fulfilled, (state, action) => {
        state.selectAllTotalRecordByYear.loading = false;
        state.selectAllTotalRecordByYear.error = null;
        state.selectAllTotalRecordByYear.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectAllTotalRecordByYear.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListTotalRecordsByYearApi.rejected, (state, action) => {
        state.selectAllTotalRecordByYear.loading = false;
        state.selectAllTotalRecordByYear.error = action.payload || action.error.message;
      })
       // Select List top 5 periods by year handlers
      .addCase(selectListTop5PeriodByYearApi.pending, (state) => {
        state.selectTop5PeriodByYear.loading = true;
        state.selectTop5PeriodByYear.error = null;
      })
      .addCase(selectListTop5PeriodByYearApi.fulfilled, (state, action) => {
        state.selectTop5PeriodByYear.loading = false;
        state.selectTop5PeriodByYear.error = null;
        state.selectTop5PeriodByYear.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectTop5PeriodByYear.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListTop5PeriodByYearApi.rejected, (state, action) => {
        state.selectTop5PeriodByYear.loading = false;
        state.selectTop5PeriodByYear.error = action.payload || action.error.message;
      })
       // Select List top 5 instructors by year handlers
      .addCase(selectListTop5InstructorByYearApi.pending, (state) => {
        state.selectTop5InstructorByYear.loading = true;
        state.selectTop5InstructorByYear.error = null;
      })
      .addCase(selectListTop5InstructorByYearApi.fulfilled, (state, action) => {
        state.selectTop5InstructorByYear.loading = false;
        state.selectTop5InstructorByYear.error = null;
        state.selectTop5InstructorByYear.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectTop5InstructorByYear.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListTop5InstructorByYearApi.rejected, (state, action) => {
        state.selectTop5InstructorByYear.loading = false;
        state.selectTop5InstructorByYear.error = action.payload || action.error.message;
      })
      ;
  },
});

export default reportYearSlice.reducer;