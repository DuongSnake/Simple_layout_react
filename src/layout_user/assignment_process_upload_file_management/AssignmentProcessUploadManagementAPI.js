import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_ASSIGNMENT_PROCESS,
API_CREATE_LIST_FILE_ASSIGNMENT_PROCESS,
API_UPDATE_LIST_FILE_ASSIGNMENT_PROCESS,
API_SELECT_LIST_FILE_ASSIGNMENT_PROCESS
} from '../../config/constant/Api.js';

export const insertListFileAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/insertListFileAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateAssignmentRegister= SERVER_API_URL + API_CREATE_LIST_FILE_ASSIGNMENT_PROCESS;
      console.log('API URL:', urlCreateAssignmentRegister);
      const response = await apiClient.post(urlCreateAssignmentRegister, authRequest);
      console.log('API create assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateListFileAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/updateListFileAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest is FormData:', authRequest instanceof FormData);
      if (authRequest instanceof FormData) {
        for (let [key, value] of authRequest.entries()) {
          console.log(`  ${key}:`, value);
        }
      }
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_UPDATE_LIST_FILE_ASSIGNMENT_PROCESS;
      // console.log('API URL:', urlUpdateAssignmentRegister);
      const response = await apiClient.post(urlUpdateAssignmentRegister, authRequest);
      // console.log('API update assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/selectListAssApprove',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_PROCESS;
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

export const selectListFileAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/selectListFileAss',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListFileAssignment= SERVER_API_URL + API_SELECT_LIST_FILE_ASSIGNMENT_PROCESS;
      // console.log('API URL:', urlSelectListFileAssignment);
      const response = await apiClient.post(urlSelectListFileAssignment, authRequest);
      // console.log('API select list file assignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);