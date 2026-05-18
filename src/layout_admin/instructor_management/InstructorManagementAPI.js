import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_LIST_INSTRUCTOR,
  API_CREATE_INSTRUCTOR,
  API_UPDATE_INSTRUCTOR,
  API_DELETE_INSTRUCTOR,
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'instructor/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_CREATE_INSTRUCTOR;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'instructor/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_UPDATE_INSTRUCTOR;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'instructor/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_DELETE_INSTRUCTOR;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListInstructorApi = createAsyncThunk(
  'instructor/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      const url = SERVER_API_URL + API_SELECT_LIST_INSTRUCTOR;
      const response = await apiClient.post(url, authRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
