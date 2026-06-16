import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_ALL_STUDENT_REGISTER_ANALYST,
} from '../../../config/constant/Api.js';


export const selectListStudentRegisterAnalystApi = createAsyncThunk(
  'reportStudentByMajor/selectAllTotalRecrod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListStudentRegisterAnalyst = SERVER_API_URL + API_SELECT_ALL_STUDENT_REGISTER_ANALYST;
      // console.log('API URL:', urlSelectListStudentRegisterAnalyst);
      const response = await apiClient.post(urlSelectListStudentRegisterAnalyst, authRequest);
      // console.log('API select list student register analyst Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
