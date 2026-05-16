import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './redux/slices/authenticationSlice';
import userManagementReducer from './redux/slices/userManagementSlice';
import majorManagementReducer from './redux/slices/majorManagementSlice';
import studentManagementReducer from './redux/slices/studentManagementSlice';
import instructorManagementReducer from './redux/slices/instructorManagementSlice';
import admissionPeriodManagementReducer from './redux/slices/admissionPeriodManagementSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    userManagement: userManagementReducer,
    majorManagement: majorManagementReducer,
    studentManagement: studentManagementReducer,
    instructorManagement: instructorManagementReducer,
    admissionPeriodManagement: admissionPeriodManagementReducer
    // Add more reducers here as you create new features
    // example: todosReducer from './redux/slices/todosSlice'
  },
});

export default store;
