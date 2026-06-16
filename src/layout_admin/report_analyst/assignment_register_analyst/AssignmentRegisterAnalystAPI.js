import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_ALL_ASSIGNMENT_REGISTER_ANALYST,
} from '../../../config/constant/Api.js';


export const selectListAssignmentRegisterAnalystApi = createAsyncThunk(
  'reportAssignmentByMajor/selectAllTotalRecrod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegisterAnalyst = SERVER_API_URL + API_SELECT_ALL_ASSIGNMENT_REGISTER_ANALYST;
      // console.log('API URL:', urlSelectListAssignmentRegisterAnalyst);
      const response = await apiClient.post(urlSelectListAssignmentRegisterAnalyst, authRequest);
      // console.log('API select list assignment register analyst Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
