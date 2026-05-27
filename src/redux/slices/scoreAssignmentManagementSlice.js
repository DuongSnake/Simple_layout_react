import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListAssignmentByPeriodTimeApi, selectListApiScoresApi } from '../../layout_admin/score_assignment_management/ScoreAssignmentManagementAPI.js';

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
      });
  },
});

export default scoreAssignmentManagementSlice.reducer;
