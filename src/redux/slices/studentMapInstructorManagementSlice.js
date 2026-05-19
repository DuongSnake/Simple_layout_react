import { createSlice } from '@reduxjs/toolkit';
import { createApi, updateApi, deleteApi, selectListStudentMapInstructorApi} from '../../layout_admin/student_map_instructor/StudentMapInstructorManagementAPI';

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
  selectList: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  }
};

const studentMapInstructorSlice = createSlice({
  name: 'studentMapInstructor',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List handlers
      .addCase(selectListStudentMapInstructorApi.pending, (state) => {
        state.selectList.loading = true;
        state.selectList.error = null;
      })
      .addCase(selectListStudentMapInstructorApi.fulfilled, (state, action) => {
        state.selectList.loading = false;
        state.selectList.error = null;
        state.selectList.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectList.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListStudentMapInstructorApi.rejected, (state, action) => {
        state.selectList.loading = false;
        state.selectList.error = action.payload || action.error.message;
      })
      // CreateStudent Map Instructor handlers
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
      // UpdateStudent Map Instructor handlers
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
      // DeleteStudent Map Instructor handlers
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
  },
});

export default studentMapInstructorSlice.reducer;
