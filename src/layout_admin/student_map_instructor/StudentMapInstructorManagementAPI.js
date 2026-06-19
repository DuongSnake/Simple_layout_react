import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_CREATE_STUDENT_MAP_INSTRUCTOR,
  API_UPDATE_STUDENT_MAP_INSTRUCTOR,
  API_DELETE_STUDENT_MAP_INSTRUCTOR,
  API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR,
  API_GET_STUDENT_INFO_MAP_BY_STUDENT_ID
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'studentMapInstructor/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlCreateStudentMapInstructor= SERVER_API_URL + API_CREATE_STUDENT_MAP_INSTRUCTOR;
      console.log('API URL:', urlCreateStudentMapInstructor);
      const response = await apiClient.post(urlCreateStudentMapInstructor, authRequest);
      console.log('API create student map instructor Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'studentMapInstructor/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlUpdateStudentMapInstructor= SERVER_API_URL + API_UPDATE_STUDENT_MAP_INSTRUCTOR;
      console.log('API URL:', urlUpdateStudentMapInstructor);
      const response = await apiClient.post(urlUpdateStudentMapInstructor, authRequest);
      console.log('API update student map instructor Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'studentMapInstructor/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlDeleteStudentMapInstructor= SERVER_API_URL + API_DELETE_STUDENT_MAP_INSTRUCTOR;
      console.log('API URL:', urlDeleteStudentMapInstructor);
      const response = await apiClient.post(urlDeleteStudentMapInstructor, authRequest);
      console.log('API delete student map instructor Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListStudentMapInstructorApi = createAsyncThunk(
  'studentMapInstructor/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListStudentMapInstructor= SERVER_API_URL + API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR;
      // console.log('API URL:', urlSelectListStudentMapInstructor);
      const response = await apiClient.post(urlSelectListStudentMapInstructor, authRequest);
      // console.log('API select list student map instructor Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getStudentInfoMapByStudentIdApi = createAsyncThunk(
  'studentMapInstructor/selectInfoMapByStudentId',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlGetStudentInfoMapByStudentId= SERVER_API_URL + API_GET_STUDENT_INFO_MAP_BY_STUDENT_ID;
      const response = await apiClient.post(urlGetStudentInfoMapByStudentId, authRequest);
      // console.log('API get student info map by student id Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
