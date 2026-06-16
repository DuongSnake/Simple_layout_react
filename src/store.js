import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './redux/slices/authenticationSlice';
import userManagementReducer from './redux/slices/userManagementSlice';
import majorManagementReducer from './redux/slices/majorManagementSlice';
import studentManagementReducer from './redux/slices/studentManagementSlice';
import instructorManagementReducer from './redux/slices/instructorManagementSlice';
import admissionPeriodManagementReducer from './redux/slices/admissionPeriodManagementSlice';
import periodAssignmentManagementReducer from './redux/slices/periodAssignmentManagementSlice';
import assignmentRegisterManagementReducer from './redux/slices/assignmentRegisterManagementSlice';
import studentMapInstructorManagementReducer from './redux/slices/studentMapInstructorManagementSlice';
import assignmentRegisterUserSiteReducer from './redux/slices/assignmentRegisterUserSiteSlice';
import assignmentProcessUploadManagementReducer from './redux/slices/assignmentProcessUploadManagementSlice';
import assignmentRegistByInstructorReducer from './redux/slices/assignmentRegistByInstructorSlice';
import studentMapCriticalManagementReducer from './redux/slices/studentMapCriticalManagementSlice';
import assignmentFinalApproveManagementReducer from './redux/slices/assignmentFinalApproveManagementSlice';
import scoreAssignmentManagementReducer from './redux/slices/scoreAssignmentManagementSlice';
import fileUploadAssignmentManagementReducer from './redux/slices/fileUploadAssignmentManagementSlice';
import reportYearReducer from './redux/slices/reportYearSlice';
import reportAnalystReducer from './redux/slices/reportAnalystSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    userManagement: userManagementReducer,
    majorManagement: majorManagementReducer,
    studentManagement: studentManagementReducer,
    instructorManagement: instructorManagementReducer,
    admissionPeriodManagement: admissionPeriodManagementReducer,
    periodAssignmentManagement: periodAssignmentManagementReducer,
    assignmentRegisterManagement: assignmentRegisterManagementReducer,
    studentMapInstructorManagement: studentMapInstructorManagementReducer,
    assignmentRegisterUserSite: assignmentRegisterUserSiteReducer,
    assignmentProcessUploadManagement: assignmentProcessUploadManagementReducer,
    studentMapCriticalManagement: studentMapCriticalManagementReducer,
    assignmentRegistByInstructor :assignmentRegistByInstructorReducer,
    assignmentFinalApproveManagement: assignmentFinalApproveManagementReducer,
    scoreAssignmentManagement: scoreAssignmentManagementReducer,
    fileUploadAssignmentManagement: fileUploadAssignmentManagementReducer,
    reportYear: reportYearReducer,
    reportAnalyst: reportAnalystReducer
    // Add more reducers here as you create new features
    // example: todosReducer from './redux/slices/todosSlice'
  },
});

export default store;
