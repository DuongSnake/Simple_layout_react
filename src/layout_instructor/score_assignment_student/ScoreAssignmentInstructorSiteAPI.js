import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_SCORE_ASSIGNMENT_INSTRUCTOR_SIDE,
API_SELECT_LIST_ASSIGNMENT_BY_ADMISSION_PERIOD_INSTRUCTOR_SIDE
} from '../../config/constant/Api.js';



export const selectListAssignmentRegisterInstructorSiteApi = createAsyncThunk(
  'scoreInstructor/selectListAssignmentByAdmissionPeriod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_BY_ADMISSION_PERIOD_INSTRUCTOR_SIDE;
      // console.log('API URL:', urlSelectListAssignmentRegister);
      const response = await apiClient.post(urlSelectListAssignmentRegister, authRequest);
      // console.log('API select list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
//For API select list 
export const selectListScoreAssignmentInstructorSiteApi = createAsyncThunk(
  'scoreInstructor/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_SCORE_ASSIGNMENT_INSTRUCTOR_SIDE;
      // console.log('API URL:', urlSelectListAssignmentRegister);
      const response = await apiClient.post(urlSelectListAssignmentRegister, authRequest);
      // console.log('API select list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);