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
    // Add more reducers here as you create new features
    // example: todosReducer from './redux/slices/todosSlice'
  },
});

export default store;
