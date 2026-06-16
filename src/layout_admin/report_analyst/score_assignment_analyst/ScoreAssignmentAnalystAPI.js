import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_ALL_SCORE_ASSIGNMENT_REGISTER_ANALYST,
} from '../../../config/constant/Api.js';


export const selectListScoreAssignmentRegisterAnalystApi = createAsyncThunk(
  'reportScoreAssignmentByMajor/selectAllTotalRecrod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListScoreAssignmentRegisterAnalyst = SERVER_API_URL + API_SELECT_ALL_SCORE_ASSIGNMENT_REGISTER_ANALYST;
      // console.log('API URL:', urlSelectListScoreAssignmentRegisterAnalyst);
      const response = await apiClient.post(urlSelectListScoreAssignmentRegisterAnalyst, authRequest);
      // console.log('API select list score assignment register analyst Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
