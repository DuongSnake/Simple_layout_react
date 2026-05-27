import { createSlice } from '@reduxjs/toolkit';
import { approveFinalAssignmentApi, selectListAssignmentFinalApproveApi } from '../../layout_instructor/assignment_waiting_final_approve/AssignmentWaitingFinalApproveAPI';
const initialState = {
  approveFinalAssignment: {
    data: null,
    loading: false,
    error: null,
  },
  selectListAssignmentFinalApprove: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
};
const assignmentFinalApproveManagementSlice = createSlice({
  name: 'assignmentFinalApproveManagement',
  initialState,
  extraReducers: (builder) => {
    // Login handlers
    builder
      // Select List handlers
      .addCase(selectListAssignmentFinalApproveApi.pending, (state) => {
        state.selectListAssignmentFinalApprove.loading = true;
        state.selectListAssignmentFinalApprove.error = null;
      })
      .addCase(selectListAssignmentFinalApproveApi.fulfilled, (state, action) => {
        state.selectListAssignmentFinalApprove.loading = false;
        state.selectListAssignmentFinalApprove.error = null;
        state.selectListAssignmentFinalApprove.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentFinalApprove.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentFinalApproveApi.rejected, (state, action) => {
        state.selectListAssignmentFinalApprove.loading = false;
        state.selectListAssignmentFinalApprove.error = action.payload || action.error.message;
      })
      // Approve Final Assignment handlers
      .addCase(approveFinalAssignmentApi.pending, (state) => {
        state.approveFinalAssignment.loading = true;
        state.approveFinalAssignment.error = null;
      })
      .addCase(approveFinalAssignmentApi.fulfilled, (state, action) => {
        state.approveFinalAssignment.loading = false;
        state.approveFinalAssignment.data = action.payload;
        state.approveFinalAssignment.error = null;
      })
      .addCase(approveFinalAssignmentApi.rejected, (state, action) => {
        state.approveFinalAssignment.loading = false;
        state.approveFinalAssignment.error = action.payload || action.error.message;
      });
  },
});

export default assignmentFinalApproveManagementSlice.reducer;