import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_ADD_MAJOR,
  API_UPDATE_MAJOR,
  API_DELETE_MAJOR,
  API_GET_LIST_MAJOR,
  API_GET_ALL_SELECT_MAJOR_ACITVE
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'major/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlCreateMajor = SERVER_API_URL + API_ADD_MAJOR;
      console.log('API URL:', urlCreateMajor);
      const response = await apiClient.post(urlCreateMajor, authRequest);
      console.log('API create major Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'major/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlUpdateMajor = SERVER_API_URL + API_UPDATE_MAJOR;
      console.log('API URL:', urlUpdateMajor);
      const response = await apiClient.post(urlUpdateMajor, authRequest);
      console.log('API update major Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'major/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlDeleteMajor = SERVER_API_URL + API_DELETE_MAJOR;
      console.log('API URL:', urlDeleteMajor);
      const response = await apiClient.post(urlDeleteMajor, authRequest);
      console.log('API delete major Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListApiMajors = createAsyncThunk(
  'major/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListMajor = SERVER_API_URL + API_GET_LIST_MAJOR;
      // console.log('API URL:', urlSelectListMajor);
      const response = await apiClient.post(urlSelectListMajor, authRequest);
      // console.log('API select list major Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListApiMajorActiveApi = createAsyncThunk(
  'major/selectListAllActive',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListMajor = SERVER_API_URL + API_GET_ALL_SELECT_MAJOR_ACITVE;
      // console.log('API URL:', urlSelectListMajor);
      const response = await apiClient.post(urlSelectListMajor, authRequest);
      // console.log('API select list major Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
