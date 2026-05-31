import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClientUser } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_ASSIGNMENT_STUDENT_USER_SIDE,
API_CREATE_ASSIGNMENT_STUDENT_USER_SIDE,
API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE,
API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE,
API_SELECT_ASSIGNMENT_STUDENT_USER_SIDE,
API_SEND_REQUEST_ASSIGNMENT_STUDENT_USER_SIDE
} from '../../config/constant/Api.js';

export const createApi = createAsyncThunk(
  'assignmentRegister/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateAssignmentRegister= SERVER_API_URL + API_CREATE_ASSIGNMENT_STUDENT_USER_SIDE;
      console.log('API URL:', urlCreateAssignmentRegister);
      const response = await apiClientUser.post(urlCreateAssignmentRegister, authRequest);
      console.log('API create assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'assignmentRegister/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest is FormData:', authRequest instanceof FormData);
      if (authRequest instanceof FormData) {
        for (let [key, value] of authRequest.entries()) {
          console.log(`  ${key}:`, value);
        }
      }
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE;
      // console.log('API URL:', urlUpdateAssignmentRegister);
      const response = await apiClientUser.post(urlUpdateAssignmentRegister, authRequest);
      // console.log('API update assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'assignmentRegister/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlDeleteAssignmentRegister= SERVER_API_URL + API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE;
      // console.log('API URL:', urlDeleteAssignmentRegister);
      const response = await apiClientUser.post(urlDeleteAssignmentRegister, authRequest);
      // console.log('API delete assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentRegisterUserSiteApi = createAsyncThunk(
  'assignmentRegister/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_STUDENT_USER_SIDE;
      // console.log('API URL:', urlSelectListAssignmentRegister);
      const response = await apiClientUser.post(urlSelectListAssignmentRegister, authRequest);
      // console.log('API select list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendRequestListAssignmentApi = createAsyncThunk(
  'assignmentRegister/sendRequestListAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSendRequestAssignmentRegister= SERVER_API_URL + API_SEND_REQUEST_ASSIGNMENT_STUDENT_USER_SIDE;
      // console.log('API URL:', urlSendRequestAssignmentRegister);
      const response = await apiClientUser.post(urlSendRequestAssignmentRegister, authRequest);
      // console.log('API send request list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);