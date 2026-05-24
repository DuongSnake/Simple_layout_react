import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE,
API_CREATE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE,
API_UPDATE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE,
API_DELETE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE,
API_SEND_REQUEST_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE,
API_SELECT_LIST_ASSIGNMENT_WAITING_APPROVE_INSTRUCTOR_SIDE,
API_SELECT_LIST_ASSIGNMENT_APPROVE_INSTRUCTOR_SIDE,
API_APPROVE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE,
API_SELECT_LIST_STUDENT_NOT_REGISTER_ASSIGNMENT_BEFORE_INSTRUCTOR_SIDE,
API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR_BEFORE_INSTRUCTOR_SIDE
} from '../../config/constant/Api.js';

export const createApi = createAsyncThunk(
  'assignmentRegisterByInstructor/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateAssignmentRegister= SERVER_API_URL + API_CREATE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE;
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

export const updateApi = createAsyncThunk(
  'assignmentRegisterByInstructor/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_UPDATE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE;
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
  'assignmentRegisterByInstructor/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlDeleteAssignmentRegister= SERVER_API_URL + API_DELETE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE;
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

export const selectListAssignmentRegisterUserSiteApi = createAsyncThunk(
  'assignmentRegisterByInstructor/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE;
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

export const sendRequestListAssignmentApi = createAsyncThunk(
  'assignmentRegisterByInstructor/sendRequestAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSendRequestAssignmentRegister= SERVER_API_URL + API_SEND_REQUEST_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE;
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

export const selectListAssignmentWaitingApproveApi = createAsyncThunk(
  'assignmentRegisterByInstructor/selectListWaitingSend',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSendRequestAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_WAITING_APPROVE_INSTRUCTOR_SIDE;
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

export const selectListAssignmentApproveApi = createAsyncThunk(
  'assignmentRegisterByInstructor/selectListAssApprove',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSendRequestAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_APPROVE_INSTRUCTOR_SIDE;
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

export const approveAssignmentWaitingApi = createAsyncThunk(
  'assignmentRegisterByInstructor/approveAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_APPROVE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE;
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

export const listStudentMapInstructorNotRegisterAssignmentBeforeApi = createAsyncThunk(
  'assignmentRegisterByInstructor/selectListStudentNotRegisterAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_STUDENT_NOT_REGISTER_ASSIGNMENT_BEFORE_INSTRUCTOR_SIDE;
      // console.log('API URL:', urlUpdateAssignmentRegister);
      const response = await apiClient.post(urlUpdateAssignmentRegister, authRequest);
      // console.log('API update selectListStudentNotRegisterAssignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const listStudentMapInstructorInstructorSiteApi = createAsyncThunk(
  'assignmentRegisterByInstructor/selectListStudentMapWithInstructorId',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR_BEFORE_INSTRUCTOR_SIDE;
      // console.log('API URL:', urlUpdateAssignmentRegister);
      const response = await apiClient.post(urlUpdateAssignmentRegister, authRequest);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);