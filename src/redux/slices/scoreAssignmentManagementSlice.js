import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListAssignmentByPeriodTimeApi, selectListApiScoresApi, insertListScoreAssignmentApi } from '../../layout_admin/score_assignment_management/ScoreAssignmentManagementAPI.js';
import {selectListAssignmentRegisterUserSiteApi} from '../../layout_user/score_assignment_management/ScoreAssignmentManagementAPI.js';
import {selectListAssignmentRegisterInstructorSiteApi, selectListScoreAssignmentInstructorSiteApi} from '../../layout_instructor/score_assignment_student/ScoreAssignmentInstructorSiteAPI.js';
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
  selectListApiScores: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListAssignmentByPeriodTime: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListAssignmentRegisterUserSite: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListAssignmentRegisterInstructorSite: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListScoreAssignmentInstructorSite: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  insertListScoreAssignment: {
    data: null,
    loading: false,
    error: null,
  }
};

const scoreAssignmentManagementSlice = createSlice({
  name: 'scoreAssignmentManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List scores handlers
      .addCase(selectListApiScoresApi.pending, (state) => {
        state.selectListApiScores.loading = true;
        state.selectListApiScores.error = null;
      })
      .addCase(selectListApiScoresApi.fulfilled, (state, action) => {
        state.selectListApiScores.loading = false;
        state.selectListApiScores.error = null;
        state.selectListApiScores.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListApiScores.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListApiScoresApi.rejected, (state, action) => {
        state.selectListApiScores.loading = false;
        state.selectListApiScores.error = action.payload || action.error.message;
      })
      // Select List assignment user site handlers
      .addCase(selectListAssignmentRegisterUserSiteApi.pending, (state) => {
        state.selectListAssignmentRegisterUserSite.loading = true;
        state.selectListAssignmentRegisterUserSite.error = null;
      })
      .addCase(selectListAssignmentRegisterUserSiteApi.fulfilled, (state, action) => {
        state.selectListAssignmentRegisterUserSite.loading = false;
        state.selectListAssignmentRegisterUserSite.error = null;
        state.selectListAssignmentRegisterUserSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentRegisterUserSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentRegisterUserSiteApi.rejected, (state, action) => {
        state.selectListAssignmentRegisterUserSite.loading = false;
        state.selectListAssignmentRegisterUserSite.error = action.payload || action.error.message;
      })
      // Select List assignment instructor site handlers
      .addCase(selectListAssignmentRegisterInstructorSiteApi.pending, (state) => {
        state.selectListAssignmentRegisterInstructorSite.loading = true;
        state.selectListAssignmentRegisterInstructorSite.error = null;
      })
      .addCase(selectListAssignmentRegisterInstructorSiteApi.fulfilled, (state, action) => {
        state.selectListAssignmentRegisterInstructorSite.loading = false;
        state.selectListAssignmentRegisterInstructorSite.error = null;
        state.selectListAssignmentRegisterInstructorSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentRegisterInstructorSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentRegisterInstructorSiteApi.rejected, (state, action) => {
        state.selectListAssignmentRegisterInstructorSite.loading = false;
        state.selectListAssignmentRegisterInstructorSite.error = action.payload || action.error.message;
      })

      
      // Select List score assignment instructor site handlers
      .addCase(selectListScoreAssignmentInstructorSiteApi.pending, (state) => {
        state.selectListScoreAssignmentInstructorSite.loading = true;
        state.selectListScoreAssignmentInstructorSite.error = null;
      })
      .addCase(selectListScoreAssignmentInstructorSiteApi.fulfilled, (state, action) => {
        state.selectListScoreAssignmentInstructorSite.loading = false;
        state.selectListScoreAssignmentInstructorSite.error = null;
        state.selectListScoreAssignmentInstructorSite.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListScoreAssignmentInstructorSite.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListScoreAssignmentInstructorSiteApi.rejected, (state, action) => {
        state.selectListScoreAssignmentInstructorSite.loading = false;
        state.selectListScoreAssignmentInstructorSite.error = action.payload || action.error.message;
      })

      // Select List assignment by period time handlers
      .addCase(selectListAssignmentByPeriodTimeApi.pending, (state) => {
        state.selectListAssignmentByPeriodTime.loading = true;
        state.selectListAssignmentByPeriodTime.error = null;
      })
      .addCase(selectListAssignmentByPeriodTimeApi.fulfilled, (state, action) => {
        state.selectListAssignmentByPeriodTime.loading = false;
        state.selectListAssignmentByPeriodTime.error = null;
        state.selectListAssignmentByPeriodTime.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentByPeriodTime.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentByPeriodTimeApi.rejected, (state, action) => {
        state.selectListAssignmentByPeriodTime.loading = false;
        state.selectListAssignmentByPeriodTime.error = action.payload || action.error.message;
      })
      // Create Score handlers
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
      // Update Score handlers
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
      // Delete Score handlers
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
      // Insert List Score Assignment handlers
      .addCase(insertListScoreAssignmentApi.pending, (state) => {
        state.insertListScoreAssignment.loading = true;
        state.insertListScoreAssignment.error = null;
      })
      .addCase(insertListScoreAssignmentApi.fulfilled, (state, action) => {
        state.insertListScoreAssignment.loading = false;
        state.insertListScoreAssignment.data = action.payload;
        state.insertListScoreAssignment.error = null;
      })
      .addCase(insertListScoreAssignmentApi.rejected, (state, action) => {
        state.insertListScoreAssignment.loading = false;
        state.insertListScoreAssignment.error = action.payload || action.error.message;
      });
  },
});

export default scoreAssignmentManagementSlice.reducer;
