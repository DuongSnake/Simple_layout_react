import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './redux/slices/authenticationSlice';
import userManagementReducer from './redux/slices/userManagementSlice';
import majorManagementReducer from './redux/slices/majorManagementSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    userManagement: userManagementReducer,
    majorManagement: majorManagementReducer,
    // Add more reducers here as you create new features
    // example: todosReducer from './redux/slices/todosSlice'
  },
});

export default store;
