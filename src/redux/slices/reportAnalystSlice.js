import { createSlice } from '@reduxjs/toolkit';
import { selectListStudentRegisterAnalystApi } from '../../layout_admin/report_analyst/student_register_analyst/StudentRegisterAnalystAPI.js';
import { selectListScoreAssignmentRegisterAnalystApi } from '../../layout_admin/report_analyst/score_assignment_analyst/ScoreAssignmentAnalystAPI.js';
import { selectListAssignmentRegisterAnalystApi } from '../../layout_admin/report_analyst/assignment_register_analyst/AssignmentRegisterAnalystAPI.js';

const initialState = {
  selectListStudentRegisterAnalyst: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListScoreAssignmentRegisterAnalyst: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  },
  selectListAssignmentRegisterAnalyst: {
    data: null,
    loading: false,
    error: null,
    totalRecord: 0
  }
}

const reportAnalystSlice = createSlice({
  name: 'reportAnalyst',
  initialState,
  extraReducers: (builder) => {
    builder
      // Select List student register analyst handlers
      .addCase(selectListStudentRegisterAnalystApi.pending, (state) => {
        state.selectListStudentRegisterAnalyst.loading = true;
        state.selectListStudentRegisterAnalyst.error = null;
      })
      .addCase(selectListStudentRegisterAnalystApi.fulfilled, (state, action) => {
        state.selectListStudentRegisterAnalyst.loading = false;
        state.selectListStudentRegisterAnalyst.error = null;
        state.selectListStudentRegisterAnalyst.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListStudentRegisterAnalyst.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })

      .addCase(selectListStudentRegisterAnalystApi.rejected, (state, action) => {
        state.selectListStudentRegisterAnalyst.loading = false;
        state.selectListStudentRegisterAnalyst.error = action.payload || action.error.message;
      })
       // Select List score assignment register analyst handlers
      .addCase(selectListScoreAssignmentRegisterAnalystApi.pending, (state) => {
        state.selectListScoreAssignmentRegisterAnalyst.loading = true;
        state.selectListScoreAssignmentRegisterAnalyst.error = null;
      })
      .addCase(selectListScoreAssignmentRegisterAnalystApi.fulfilled, (state, action) => {
        state.selectListScoreAssignmentRegisterAnalyst.loading = false;
        state.selectListScoreAssignmentRegisterAnalyst.error = null;
        state.selectListScoreAssignmentRegisterAnalyst.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListScoreAssignmentRegisterAnalyst.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListScoreAssignmentRegisterAnalystApi.rejected, (state, action) => {
        state.selectListScoreAssignmentRegisterAnalyst.loading = false;
        state.selectListScoreAssignmentRegisterAnalyst.error = action.payload || action.error.message;
      })


       // Select list assignment register analyst handlers
      .addCase(selectListAssignmentRegisterAnalystApi.pending, (state) => {
        state.selectListAssignmentRegisterAnalyst.loading = true;
        state.selectListAssignmentRegisterAnalyst.error = null;
      })
      .addCase(selectListAssignmentRegisterAnalystApi.fulfilled, (state, action) => {
        state.selectListAssignmentRegisterAnalyst.loading = false;
        state.selectListAssignmentRegisterAnalyst.error = null;
        state.selectListAssignmentRegisterAnalyst.data = (undefined === action.payload.data.data) ? null : action.payload.data.data;
        state.selectListAssignmentRegisterAnalyst.totalRecord = (undefined === action.payload.data.totalRecord) ? null : action.payload.data.totalRecord;
      })
      .addCase(selectListAssignmentRegisterAnalystApi.rejected, (state, action) => {
        state.selectListAssignmentRegisterAnalyst.loading = false;
        state.selectListAssignmentRegisterAnalyst.error = action.payload || action.error.message;
      })
      ;
  },
});

export default reportAnalystSlice.reducer;