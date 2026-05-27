import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_GET_LIST_ASSIGNMENT_WAITING_FINAL_APPROVE,
API_APPROVE_FINAL_ASSIGNMENT_GO_TO_PROTECT
} from '../../config/constant/Api.js';



export const approveFinalAssignmentApi = createAsyncThunk(
  'studentMapCritical/approveFinalAssignmentStudentRegister',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSendRequestAssignmentRegister= SERVER_API_URL + API_APPROVE_FINAL_ASSIGNMENT_GO_TO_PROTECT;
      // console.log('API URL:', urlSendRequestAssignmentRegister);
      const response = await apiClient.post(urlSendRequestAssignmentRegister, authRequest);
      // console.log('API send request list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentFinalApproveApi = createAsyncThunk(
  'studentMapCritical/selectListWaitngFinalApprove',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSendRequestAssignmentRegister= SERVER_API_URL + API_GET_LIST_ASSIGNMENT_WAITING_FINAL_APPROVE;
      // console.log('API URL:', urlSendRequestAssignmentRegister);
      const response = await apiClient.post(urlSendRequestAssignmentRegister, authRequest);
      // console.log('API send request list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

