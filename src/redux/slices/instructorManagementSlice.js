import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListInstructorApi } from '../../layout_admin/instructor_management/InstructorManagementAPI';

const initialState = {
  create: { data: null, loading: false, error: null },
  update: { data: null, loading: false, error: null },
  delete: { data: null, loading: false, error: null },
  selectListInstructor: { data: null, loading: false, error: null, totalRecord: 0 }
};

const instructorManagementSlice = createSlice({
  name: 'instructorManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(selectListInstructorApi.pending, (state) => {
        state.selectListInstructor.loading = true;
        state.selectListInstructor.error = null;
      })
      .addCase(selectListInstructorApi.fulfilled, (state, action) => {
        state.selectListInstructor.loading = false;
        state.selectListInstructor.error = null;
        state.selectListInstructor.data = action.payload.data?.data ?? null;
        state.selectListInstructor.totalRecord = action.payload.data?.totalRecord ?? 0;
      })
      .addCase(selectListInstructorApi.rejected, (state, action) => {
        state.selectListInstructor.loading = false;
        state.selectListInstructor.error = action.payload || action.error.message;
      })
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
  }
});

export default instructorManagementSlice.reducer;
