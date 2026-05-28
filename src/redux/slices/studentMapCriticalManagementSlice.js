import { createSlice } from '@reduxjs/toolkit';
import {createMapCriticalApi, updateMapCriticalApi, deleteMapCriticalApi, selectListMapCriticalApi, selectListCriticalByStudentIdApi, selectListUserToMapCriticalApi
,selectListStudentByCriticalIdApi
} from "../../layout_admin/student_map_critical/StudentMapCriticalManagementAPI.js";
const initialState = {
  insert: {
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
  selectListUserToMapCritical: {
    data: null,
    loading: false,
    error: null,
  },
  selectListMapCritical: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListCriticalByStudentId: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListStudentByCriticalId: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  }
};

const studentMapCriticalManagement = createSlice({
  name: 'studentMapCriticalManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List student map critical
      .addCase(selectListMapCriticalApi.pending, (state) => {
        state.selectListMapCritical.loading = true;
        state.selectListMapCritical.error = null;
      })
      .addCase(selectListMapCriticalApi.fulfilled, (state, action) => {
        state.selectListMapCritical.loading = false;
        state.selectListMapCritical.error = null;
        state.selectListMapCritical.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListMapCritical.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListMapCriticalApi.rejected, (state, action) => {
        state.selectListMapCritical.loading = false;
        state.selectListMapCritical.error = action.payload || action.error.message;
      })
      // Update student map critical
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
      // insert student map critical
      .addCase(createMapCriticalApi.pending, (state) => {
        state.insert.loading = true;
        state.insert.error = null;
      })
      .addCase(createMapCriticalApi.fulfilled, (state, action) => {
        state.insert.loading = false;
        state.insert.data = action.payload;
        state.insert.error = null;
      })
      .addCase(createMapCriticalApi.rejected, (state, action) => {
        state.insert.loading = false;
        state.insert.error = action.payload || action.error.message;
      })
      // delete student map critical
      .addCase(deleteMapCriticalApi.pending, (state) => {
        state.delete.loading = true;
        state.delete.error = null;
      })
      .addCase(deleteMapCriticalApi.fulfilled, (state, action) => {
        state.delete.loading = false;
        state.delete.data = action.payload;
        state.delete.error = null;
      })
      .addCase(deleteMapCriticalApi.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.error = action.payload || action.error.message;
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
      })
      
      
      // Select List user have type assignment approve handlers
      .addCase(selectListCriticalByStudentIdApi.pending, (state) => {
        state.selectListCriticalByStudentId.loading = true;
        state.selectListCriticalByStudentId.error = null;
      })
      .addCase(selectListCriticalByStudentIdApi.fulfilled, (state, action) => {
        state.selectListCriticalByStudentId.loading = false;
        state.selectListCriticalByStudentId.error = null;
        state.selectListCriticalByStudentId.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListCriticalByStudentId.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListCriticalByStudentIdApi.rejected, (state, action) => {
        state.selectListCriticalByStudentId.loading = false;
        state.selectListCriticalByStudentId.error = action.payload || action.error.message;
      })
      // Select List student by critical id handlers
      .addCase(selectListStudentByCriticalIdApi.pending, (state) => {
        state.selectListStudentByCriticalId.loading = true;
        state.selectListStudentByCriticalId.error = null;
      })
      .addCase(selectListStudentByCriticalIdApi.fulfilled, (state, action) => {
        state.selectListStudentByCriticalId.loading = false;
        state.selectListStudentByCriticalId.error = null;
        state.selectListStudentByCriticalId.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListStudentByCriticalId.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListStudentByCriticalIdApi.rejected, (state, action) => {
        state.selectListStudentByCriticalId.loading = false;
        state.selectListStudentByCriticalId.error = action.payload || action.error.message;
      });
  },
});

export default studentMapCriticalManagement.reducer;