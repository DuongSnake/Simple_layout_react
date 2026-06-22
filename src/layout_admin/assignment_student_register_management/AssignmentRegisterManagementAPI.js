import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_ASSIGNMENT_STUDENT_ADMIN_SIDE,
API_CREATE_ASSIGNMENT_STUDENT_ADMIN_SIDE,
API_UPDATE_ASSIGNMENT_STUDENT_ADMIN_SIDE,
API_DELETE_ASSIGNMENT_STUDENT_ADMIN_SIDE,
API_SELECT_ASSIGNMENT_STUDENT_ADMIN_SIDE
} from '../../config/constant/Api.js';
import { RESPONSECD_SUCCESS } from '../../config/constant/Constants';

export const createApi = createAsyncThunk(
  'assignmentStudentRegister/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateAssignmentRegister= SERVER_API_URL + API_CREATE_ASSIGNMENT_STUDENT_ADMIN_SIDE;
      console.log('API URL:', urlCreateAssignmentRegister);
      const response = await apiClient.post(urlCreateAssignmentRegister, authRequest);
      if (response.data?.responseCd === RESPONSECD_SUCCESS) {
        return response.data;
      }
      return rejectWithValue(
        response.data?.responseMsg || response.data?.responseCd || 'Thêm mới đồ án không thành công.'
      );
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'assignmentStudentRegister/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_UPDATE_ASSIGNMENT_STUDENT_ADMIN_SIDE;
      // console.log('API URL:', urlUpdateAssignmentRegister);
      const response = await apiClient.post(urlUpdateAssignmentRegister, authRequest);
      if (response.data?.responseCd === RESPONSECD_SUCCESS) {
        return response.data;
      }
      return rejectWithValue(
        response.data?.responseMsg || response.data?.responseCd || 'Thêm mới đồ án không thành công.'
      );
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'assignmentStudentRegister/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlDeleteAssignmentRegister= SERVER_API_URL + API_DELETE_ASSIGNMENT_STUDENT_ADMIN_SIDE;
      // console.log('API URL:', urlDeleteAssignmentRegister);
      const response = await apiClient.post(urlDeleteAssignmentRegister, authRequest);
      if (response.data?.responseCd === RESPONSECD_SUCCESS) {
        return response.data;
      }
      return rejectWithValue(
        response.data?.responseMsg || response.data?.responseCd || 'Thêm mới đồ án không thành công.'
      );
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentRegisterApi = createAsyncThunk(
  'assignmentStudentRegister/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_STUDENT_ADMIN_SIDE;
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