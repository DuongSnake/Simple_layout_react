import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListApiAdmissionPeriodsApi } from '../../layout_admin/admission_period_management/AdmissionPeriodManagementAPI';

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
  selectListApiAdmissionPeriods: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
};

const admissionPeriodManagementSlice = createSlice({
  name: 'admissionPeriodManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List handlers
      .addCase(selectListApiAdmissionPeriodsApi.pending, (state) => {
        state.selectListApiAdmissionPeriods.loading = true;
        state.selectListApiAdmissionPeriods.error = null;
      })
      .addCase(selectListApiAdmissionPeriodsApi.fulfilled, (state, action) => {
        state.selectListApiAdmissionPeriods.loading = false;
        state.selectListApiAdmissionPeriods.error = null;
        state.selectListApiAdmissionPeriods.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListApiAdmissionPeriods.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListApiAdmissionPeriodsApi.rejected, (state, action) => {
        state.selectListApiAdmissionPeriods.loading = false;
        state.selectListApiAdmissionPeriods.error = action.payload || action.error.message;
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
      });
  },
});

export default admissionPeriodManagementSlice.reducer;
