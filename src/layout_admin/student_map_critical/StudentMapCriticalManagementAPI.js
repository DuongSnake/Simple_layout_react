import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_UPDATE_STUDENT_MAP_CRITICAL,
  API_GET_STUDENT_READY_MAP_CRITICAL,
  API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR
} from '../../config/constant/Api';


export const updateMapCriticalApi = createAsyncThunk(
  'studentMapInstructor/mapCritical',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlUpdateStudentMapInstructor= SERVER_API_URL + API_UPDATE_STUDENT_MAP_CRITICAL;
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

export const selectListUserToMapCriticalApi = createAsyncThunk(
  'studentMapInstructor/selectListUserToMapCritical',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlDeleteStudentMapInstructor= SERVER_API_URL + API_GET_STUDENT_READY_MAP_CRITICAL;
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
