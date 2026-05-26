import { createSlice } from '@reduxjs/toolkit';
import {updateMapCriticalApi, selectListUserToMapCriticalApi, selectListStudentMapInstructorApi} from "../../layout_admin/student_map_critical/StudentMapCriticalManagementAPI.js";
const initialState = {
  update: {
    data: null,
    loading: false,
    error: null,
  },
  selectListUserToMapCritical: {
    data: null,
    loading: false,
    error: null,
  },
  selectListApiAdmissionPeriods: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
};

const studentMapCriticalManagement = createSlice({
  name: 'studentMapCriticalManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List handlers
      .addCase(selectListStudentMapInstructorApi.pending, (state) => {
        state.selectListApiAdmissionPeriods.loading = true;
        state.selectListApiAdmissionPeriods.error = null;
      })
      .addCase(selectListStudentMapInstructorApi.fulfilled, (state, action) => {
        state.selectListApiAdmissionPeriods.loading = false;
        state.selectListApiAdmissionPeriods.error = null;
        state.selectListApiAdmissionPeriods.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListApiAdmissionPeriods.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListStudentMapInstructorApi.rejected, (state, action) => {
        state.selectListApiAdmissionPeriods.loading = false;
        state.selectListApiAdmissionPeriods.error = action.payload || action.error.message;
      })
      // Update Admission Period handlers
      .addCase(updateMapCriticalApi.pending, (state) => {
        state.update.loading = true;
        state.update.error = null;
      })
      .addCase(updateMapCriticalApi.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.data = action.payload;
        state.update.error = null;
      })
      .addCase(updateMapCriticalApi.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload || action.error.message;
      })

      // Select List user have type assignment approve handlers
      .addCase(selectListUserToMapCriticalApi.pending, (state) => {
        state.selectListUserToMapCritical.loading = true;
        state.selectListUserToMapCritical.error = null;
      })
      .addCase(selectListUserToMapCriticalApi.fulfilled, (state, action) => {
        state.selectListUserToMapCritical.loading = false;
        state.selectListUserToMapCritical.error = null;
        state.selectListUserToMapCritical.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListUserToMapCritical.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListUserToMapCriticalApi.rejected, (state, action) => {
        state.selectListUserToMapCritical.loading = false;
        state.selectListUserToMapCritical.error = action.payload || action.error.message;
      });
  },
});

export default studentMapCriticalManagement.reducer;