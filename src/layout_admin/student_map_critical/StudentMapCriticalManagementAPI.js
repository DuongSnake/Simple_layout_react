import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_LIST_STUDENT_MAP_CRITICAL,
  API_CREATE_STUDENT_MAP_CRITICAL,
  API_UPDATE_STUDENT_MAP_CRITICAL,
  API_DELETE_STUDENT_MAP_CRITICAL,
  API_GET_STUDENT_MAP_CRITICAL,
  API_GET_LIST_CRITICAL_BY_STUDENT_ID
} from '../../config/constant/Api';

export const createMapCriticalApi = createAsyncThunk(
  'studentMapCritical/insert',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateStudentMapCritical= SERVER_API_URL + API_CREATE_STUDENT_MAP_CRITICAL;
      console.log('API URL:', urlCreateStudentMapCritical);
      const response = await apiClient.post(urlCreateStudentMapCritical, authRequest);
      console.log('API create student map critical Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMapCriticalApi = createAsyncThunk(
  'studentMapCritical/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlUpdateStudentMapCritical= SERVER_API_URL + API_UPDATE_STUDENT_MAP_CRITICAL;
      console.log('API URL:', urlUpdateStudentMapCritical);
      const response = await apiClient.post(urlUpdateStudentMapCritical, authRequest);
      console.log('API update student map critical Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMapCriticalApi = createAsyncThunk(
  'studentMapCritical/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlDeleteStudentMapCritical= SERVER_API_URL + API_DELETE_STUDENT_MAP_CRITICAL;
      console.log('API URL:', urlDeleteStudentMapCritical);
      const response = await apiClient.post(urlDeleteStudentMapCritical, authRequest);
      console.log('API delete student map critical Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListMapCriticalApi = createAsyncThunk(
  'studentMapCritical/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListStudentMapCritical= SERVER_API_URL + API_SELECT_LIST_STUDENT_MAP_CRITICAL;
      // console.log('API URL:', urlSelectListStudentMapCritical);
      const response = await apiClient.post(urlSelectListStudentMapCritical, authRequest);
      // console.log('API select list student map critical Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListCriticalByStudentIdApi = createAsyncThunk(
  'studentMapCritical/selectListCriticalByStudentId',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlSelectListCriticalByStudentId= SERVER_API_URL + API_GET_LIST_CRITICAL_BY_STUDENT_ID;
      const response = await apiClient.post(urlSelectListCriticalByStudentId, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListUserToMapCriticalApi = createAsyncThunk(
  'studentMapCritical/selectListUserToMapCritical',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListStudentMapCritical= SERVER_API_URL + API_GET_STUDENT_MAP_CRITICAL;
      // console.log('API URL:', urlSelectListStudentMapCritical);
      const response = await apiClient.post(urlSelectListStudentMapCritical, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
