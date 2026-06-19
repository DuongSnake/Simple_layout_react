import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_CREATE_USER,
  API_UPDATE_USER,
  API_DELETE_USER,
  API_SELECT_LIST_USER,
  API_SELECT_ALL_ROLES,
  API_SELECT_ALL_STUDENTS,
  API_SELECT_ALL_INSTRUCTORS,
  API_SELECT_ALL_STUDENTS_DONT_HAVE_ASSIGNMENT
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'user/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlCreateUser= SERVER_API_URL + API_CREATE_USER;
      console.log('API URL:', urlCreateUser);
      const response = await apiClient.post(urlCreateUser, authRequest);
      console.log('API create user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'user/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlUpdateUser= SERVER_API_URL + API_UPDATE_USER;
      console.log('API URL:', urlUpdateUser);
      const response = await apiClient.post(urlUpdateUser, authRequest);
      console.log('API update user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'user/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlDeleteUser= SERVER_API_URL + API_DELETE_USER;
      console.log('API URL:', urlDeleteUser);
      const response = await apiClient.post(urlDeleteUser, authRequest);
      console.log('API delete user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListApi = createAsyncThunk(
  'user/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListUser= SERVER_API_URL + API_SELECT_LIST_USER;
      // console.log('API URL:', urlSelectListUser);
      const response = await apiClient.post(urlSelectListUser, authRequest);
      // console.log('API select list user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectAllRolesApi = createAsyncThunk(
  'user/selectAllRoles',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlSelectAllRoles = SERVER_API_URL + API_SELECT_ALL_ROLES;
      const response = await apiClient.post(urlSelectAllRoles);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectAllStudentApi = createAsyncThunk(
  'user/selectStudentNotHaveAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlSelectAllStudent = SERVER_API_URL + API_SELECT_ALL_STUDENTS_DONT_HAVE_ASSIGNMENT;
      const response = await apiClient.post(urlSelectAllStudent);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectAllInstructorApi = createAsyncThunk(
  'user/selectAllInstructor',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlSelectAllInstructor = SERVER_API_URL + API_SELECT_ALL_INSTRUCTORS;
      const response = await apiClient.post(urlSelectAllInstructor);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);