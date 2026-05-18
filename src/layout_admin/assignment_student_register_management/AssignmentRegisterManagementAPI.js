import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_ASSIGNMENT_STUDENT_USER_SIDE,
API_CREATE_ASSIGNMENT_STUDENT_USER_SIDE,
API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE,
API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE,
API_SELECT_ASSIGNMENT_STUDENT_USER_SIDE
} from '../../config/constant/Api.js';

export const createApi = createAsyncThunk(
  'assignmentRegister/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlCreateAssignmentRegister= SERVER_API_URL + API_CREATE_ASSIGNMENT_STUDENT_USER_SIDE;
      // console.log('API URL:', urlCreateAssignmentRegister);
      const response = await apiClient.post(urlCreateAssignmentRegister, authRequest);
      // console.log('API create assignmentRegister Success Response:', response.data);
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
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE;
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

export const deleteApi = createAsyncThunk(
  'assignmentRegister/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlDeleteAssignmentRegister= SERVER_API_URL + API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE;
      // console.log('API URL:', urlDeleteAssignmentRegister);
      const response = await apiClient.post(urlDeleteAssignmentRegister, authRequest);
      // console.log('API delete assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentRegisterApi = createAsyncThunk(
  'assignmentRegister/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_STUDENT_USER_SIDE;
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