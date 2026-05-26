import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListAssignmentRegisterUserSiteApi, listStudentMapInstructorNotRegisterAssignmentBeforeApi
, sendRequestListAssignmentApi, selectListAssignmentWaitingApproveApi, approveAssignmentWaitingApi, selectListAssignmentApproveApi
,listStudentMapInstructorInstructorSiteApi, sendRequestFinalApproveAssignmentApi } from '../../layout_instructor/assignment_register_by_instructor/AssignmentRegisterByInstructorAPI.js';

const initialState = {
  create: {
    data: null,
    loading: false,
    error: null,
  },
  update: {
    data: null,
    loading: false,
    error: null,
  },
  delete: {
    data: null,
    loading: false,
    error: null,
  },
  selectListAssignmentRegisterInstructorSite: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListAssignmentWaitingApproveInstructorSite: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  approveAssignmentInstructorSite: {
    data: null,
    loading: false,
    error: null,
  },
  selectListApproveAssignmentInstructorSite: {
    data: null,
    loading: false,
    error: null,
  },
  sendRequestListAssignment: {
    data: null,
    loading: false,
    error: null
  },
  sendRequestFinalApproveAssignment: {
    data: null,
    loading: false,
    error: null
  },
  listStudentMapInstructorNotRegisterAssignmentBefore: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  listStudentMapInstructorInstructorSite: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  }
};

const assignmentRegistByInstructorSlice = createSlice({
  name: 'assignmentRegistByInstructor',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List handlers
      .addCase(selectListAssignmentRegisterUserSiteApi.pending, (state) => {
        state.selectListAssignmentRegisterInstructorSite.loading = true;
        state.selectListAssignmentRegisterInstructorSite.error = null;
      })
      .addCase(selectListAssignmentRegisterUserSiteApi.fulfilled, (state, action) => {
        state.selectListAssignmentRegisterInstructorSite.loading = false;
        state.selectListAssignmentRegisterInstructorSite.error = null;
        state.selectListAssignmentRegisterInstructorSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentRegisterInstructorSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentRegisterUserSiteApi.rejected, (state, action) => {
        state.selectListAssignmentRegisterInstructorSite.loading = false;
        state.selectListAssignmentRegisterInstructorSite.error = action.payload || action.error.message;
      })
      // Create Admission Period handlers
      .addCase(createApi.pending, (state) => {
        state.create.loading = true;
        state.create.error = null;
      })
      .addCase(createApi.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.data = action.payload;
        state.create.error = null;
      })
      .addCase(createApi.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload || action.error.message;
      })
      // Update Admission Period handlers
      .addCase(updateApi.pending, (state) => {
        state.update.loading = true;
        state.update.error = null;
      })
      .addCase(updateApi.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.data = action.payload;
        state.update.error = null;
      })
      .addCase(updateApi.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload || action.error.message;
      })
      // Delete Admission Period handlers
      .addCase(deleteApi.pending, (state) => {
        state.delete.loading = true;
        state.delete.error = null;
      })
      .addCase(deleteApi.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.data = action.payload;
        state.delete.error = null;
      })
      .addCase(deleteApi.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload || action.error.message;
      })
      // Send Request List Assignment handlers
      .addCase(sendRequestListAssignmentApi.pending, (state) => {
        state.sendRequestListAssignment.loading = true;
        state.sendRequestListAssignment.error = null;
      })
      .addCase(sendRequestListAssignmentApi.fulfilled, (state, action) => {
        state.sendRequestListAssignment.loading = false;
        state.sendRequestListAssignment.data = action.payload;
        state.sendRequestListAssignment.error = null;
      })
      .addCase(sendRequestListAssignmentApi.rejected, (state, action) => {
        state.sendRequestListAssignment.loading = false;
        state.sendRequestListAssignment.error = action.payload || action.error.message;
      })

      
      // Send Request final approve Assignment handlers
      .addCase(sendRequestFinalApproveAssignmentApi.pending, (state) => {
        state.sendRequestListAssignment.loading = true;
        state.sendRequestListAssignment.error = null;
      })
      .addCase(sendRequestFinalApproveAssignmentApi.fulfilled, (state, action) => {
        state.sendRequestListAssignment.loading = false;
        state.sendRequestListAssignment.data = action.payload;
        state.sendRequestListAssignment.error = null;
      })
      .addCase(sendRequestFinalApproveAssignmentApi.rejected, (state, action) => {
        state.sendRequestListAssignment.loading = false;
        state.sendRequestListAssignment.error = action.payload || action.error.message;
      })
      // Select List assignment waiting approve handlers
      .addCase(selectListAssignmentWaitingApproveApi.pending, (state) => {
        state.selectListAssignmentWaitingApproveInstructorSite.loading = true;
        state.selectListAssignmentWaitingApproveInstructorSite.error = null;
      })
      .addCase(selectListAssignmentWaitingApproveApi.fulfilled, (state, action) => {
        state.selectListAssignmentWaitingApproveInstructorSite.loading = false;
        state.selectListAssignmentWaitingApproveInstructorSite.error = null;
        state.selectListAssignmentWaitingApproveInstructorSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentWaitingApproveInstructorSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentWaitingApproveApi.rejected, (state, action) => {
        state.selectListAssignmentWaitingApproveInstructorSite.loading = false;
        state.selectListAssignmentWaitingApproveInstructorSite.error = action.payload || action.error.message;
      })
      // Select List assignment approve handlers
      .addCase(selectListAssignmentApproveApi.pending, (state) => {
        state.selectListApproveAssignmentInstructorSite.loading = true;
        state.selectListApproveAssignmentInstructorSite.error = null;
      })
      .addCase(selectListAssignmentApproveApi.fulfilled, (state, action) => {
        state.selectListApproveAssignmentInstructorSite.loading = false;
        state.selectListApproveAssignmentInstructorSite.error = null;
        state.selectListApproveAssignmentInstructorSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListApproveAssignmentInstructorSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentApproveApi.rejected, (state, action) => {
        state.selectListApproveAssignmentInstructorSite.loading = false;
        state.selectListApproveAssignmentInstructorSite.error = action.payload || action.error.message;
      })
      // Select List student map instructor handlers
      .addCase(listStudentMapInstructorInstructorSiteApi.pending, (state) => {
        state.listStudentMapInstructorInstructorSite.loading = true;
        state.listStudentMapInstructorInstructorSite.error = null;
      })
      .addCase(listStudentMapInstructorInstructorSiteApi.fulfilled, (state, action) => {
        state.listStudentMapInstructorInstructorSite.loading = false;
        state.listStudentMapInstructorInstructorSite.error = null;
        console.log("akkakka:"+JSON.stringify(action.payload.data.data));
        state.listStudentMapInstructorInstructorSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.listStudentMapInstructorInstructorSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(listStudentMapInstructorInstructorSiteApi.rejected, (state, action) => {
        state.listStudentMapInstructorInstructorSite.loading = false;
        state.listStudentMapInstructorInstructorSite.error = action.payload || action.error.message;
      })


      // Select List student map instructor but not reigster assignment before handlers
      .addCase(listStudentMapInstructorNotRegisterAssignmentBeforeApi.pending, (state) => {
        state.listStudentMapInstructorNotRegisterAssignmentBefore.loading = true;
        state.listStudentMapInstructorNotRegisterAssignmentBefore.error = null;
      })
      .addCase(listStudentMapInstructorNotRegisterAssignmentBeforeApi.fulfilled, (state, action) => {
        state.listStudentMapInstructorNotRegisterAssignmentBefore.loading = false;
        state.listStudentMapInstructorNotRegisterAssignmentBefore.error = null;
        state.listStudentMapInstructorNotRegisterAssignmentBefore.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.listStudentMapInstructorNotRegisterAssignmentBefore.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(listStudentMapInstructorNotRegisterAssignmentBeforeApi.rejected, (state, action) => {
        state.listStudentMapInstructorNotRegisterAssignmentBefore.loading = false;
        state.listStudentMapInstructorNotRegisterAssignmentBefore.error = action.payload || action.error.message;
      })

      // Approve Assignment process handlers
      .addCase(approveAssignmentWaitingApi.pending, (state) => {
        state.approveAssignmentInstructorSite.loading = true;
        state.approveAssignmentInstructorSite.error = null;
      })
      .addCase(approveAssignmentWaitingApi.fulfilled, (state, action) => {
        state.approveAssignmentInstructorSite.loading = false;
        state.approveAssignmentInstructorSite.data = action.payload;
        state.approveAssignmentInstructorSite.error = null;
      })
      .addCase(approveAssignmentWaitingApi.rejected, (state, action) => {
        state.approveAssignmentInstructorSite.loading = false;
        state.approveAssignmentInstructorSite.error = action.payload || action.error.message;
      });
      
  },
});

export default assignmentRegistByInstructorSlice.reducer;
