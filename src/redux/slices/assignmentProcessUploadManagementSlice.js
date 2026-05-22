import { createSlice } from '@reduxjs/toolkit';
import { insertListFileAssignmentProcessApi, updateListFileAssignmentProcessApi, selectListAssignmentProcessApi, selectListFileAssignmentProcessApi, downloadFileStudentUploadApi } from '../../layout_user/assignment_process_upload_file_management/AssignmentProcessUploadManagementAPI.js';

const initialState = {
  insertListFileAssignmentProcess: {
    data: null,
    loading: false,
    error: null,
  },
  updateListFileAssignmentProcess: {
    data: null,
    loading: false,
    error: null,
  },
  selectListFileAssignmentProcess: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListAssignmentProcess: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  downloadFileStudentUpload: {
    data: null,
    loading: false,
    error: null
  }
};

const assignmentProcessUploadManagementSlice = createSlice({
  name: 'assignmentProcessUploadManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List handlers
      .addCase(selectListAssignmentProcessApi.pending, (state) => {
        state.selectListAssignmentProcess.loading = true;
        state.selectListAssignmentProcess.error = null;
      })
      .addCase(selectListAssignmentProcessApi.fulfilled, (state, action) => {
        state.selectListAssignmentProcess.loading = false;
        state.selectListAssignmentProcess.error = null;
        state.selectListAssignmentProcess.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentProcess.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentProcessApi.rejected, (state, action) => {
        state.selectListAssignmentProcess.loading = false;
        state.selectListAssignmentProcess.error = action.payload || action.error.message;
      })
      // Create Admission Period handlers
      .addCase(insertListFileAssignmentProcessApi.pending, (state) => {
        state.insertListFileAssignmentProcess.loading = true;
        state.insertListFileAssignmentProcess.error = null;
      })
      .addCase(insertListFileAssignmentProcessApi.fulfilled, (state, action) => {
        state.insertListFileAssignmentProcess.loading = false;
        state.insertListFileAssignmentProcess.data = action.payload;
        state.insertListFileAssignmentProcess.error = null;
      })
      .addCase(insertListFileAssignmentProcessApi.rejected, (state, action) => {
        state.insertListFileAssignmentProcess.loading = false;
        state.insertListFileAssignmentProcess.error = action.payload || action.error.message;
      })
      // Update Admission Period handlers
      .addCase(updateListFileAssignmentProcessApi.pending, (state) => {
        state.updateListFileAssignmentProcess.loading = true;
        state.updateListFileAssignmentProcess.error = null;
      })
      .addCase(updateListFileAssignmentProcessApi.fulfilled, (state, action) => {
        state.updateListFileAssignmentProcess.loading = false;
        state.updateListFileAssignmentProcess.data = action.payload;
        state.updateListFileAssignmentProcess.error = null;
      })
      .addCase(updateListFileAssignmentProcessApi.rejected, (state, action) => {
        state.updateListFileAssignmentProcess.loading = false;
        state.updateListFileAssignmentProcess.error = action.payload || action.error.message;
      })
      // Delete Admission Period handlers
      .addCase(selectListFileAssignmentProcessApi.pending, (state) => {
        state.selectListFileAssignmentProcess.loading = true;
        state.selectListFileAssignmentProcess.error = null;
      })
      .addCase(selectListFileAssignmentProcessApi.fulfilled, (state, action) => {
        state.selectListFileAssignmentProcess.loading = false;
        state.selectListFileAssignmentProcess.error = null;
        state.selectListFileAssignmentProcess.data = (undefined === action.payload.data || null === action.payload.data || null === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListFileAssignmentProcess.totalRecord = (undefined === action.payload.data || null === action.payload.data || undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListFileAssignmentProcessApi.rejected, (state, action) => {
        state.selectListFileAssignmentProcess.loading = false;
        state.selectListFileAssignmentProcess.error = action.payload || action.error.message;
      })
      // Download File handlers
      .addCase(downloadFileStudentUploadApi.pending, (state) => {
        state.downloadFileStudentUpload.loading = true;
        state.downloadFileStudentUpload.error = null;
      })
      .addCase(downloadFileStudentUploadApi.fulfilled, (state, action) => {
        state.downloadFileStudentUpload.loading = false;
        state.downloadFileStudentUpload.data = action.payload;
        state.downloadFileStudentUpload.error = null;
      })
      .addCase(downloadFileStudentUploadApi.rejected, (state, action) => {
        state.downloadFileStudentUpload.loading = false;
        state.downloadFileStudentUpload.error = action.payload || action.error.message;
      })
  },
});

export default assignmentProcessUploadManagementSlice.reducer;
