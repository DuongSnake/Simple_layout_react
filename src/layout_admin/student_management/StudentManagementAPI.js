import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_LIST_STUDENT,
  API_CREATE_STUDENT,
  API_UPDATE_STUDENT,
  API_DELETE_STUDENT,
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'student/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_CREATE_STUDENT;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'student/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_UPDATE_STUDENT;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'student/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_DELETE_STUDENT;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListApi = createAsyncThunk(
  'student/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_SELECT_LIST_STUDENT;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
