import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListApi } from '../../layout_admin/instructor_management/InstructorManagementAPI';

const initialState = {
  create: { data: null, loading: false, error: null },
  update: { data: null, loading: false, error: null },
  delete: { data: null, loading: false, error: null },
  selectList: { data: null, loading: false, error: null, totalRecord: 0 }
};

const instructorManagementSlice = createSlice({
  name: 'instructorManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(selectListApi.pending, (state) => {
        state.selectList.loading = true;
        state.selectList.error = null;
      })
      .addCase(selectListApi.fulfilled, (state, action) => {
        state.selectList.loading = false;
        state.selectList.error = null;
        state.selectList.data = action.payload.data?.data ?? null;
        state.selectList.totalRecord = action.payload.data?.totalRecord ?? 0;
      })
      .addCase(selectListApi.rejected, (state, action) => {
        state.selectList.loading = false;
        state.selectList.error = action.payload || action.error.message;
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
