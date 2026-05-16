import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_ADMISSION_PERIOD,
API_CREATE_ADMISSION_PERIOD,
API_UPDATE_ADMISSION_PERIOD,
API_DELETE_ADMISSION_PERIOD,
API_SELECT_ADMISSION_PERIOD
} from '../../config/constant/Api.js';

export const createApi = createAsyncThunk(
  'admissionPeriod/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlCreateAdmissionPeriod= SERVER_API_URL + API_CREATE_ADMISSION_PERIOD;
      // console.log('API URL:', urlCreateAdmissionPeriod);
      const response = await apiClient.post(urlCreateAdmissionPeriod, authRequest);
      // console.log('API create admissionPeriod Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'admissionPeriod/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateAdmissionPeriod= SERVER_API_URL + API_UPDATE_ADMISSION_PERIOD;
      // console.log('API URL:', urlUpdateAdmissionPeriod);
      const response = await apiClient.post(urlUpdateAdmissionPeriod, authRequest);
      // console.log('API update admissionPeriod Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'admissionPeriod/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlDeleteAdmissionPeriod= SERVER_API_URL + API_DELETE_ADMISSION_PERIOD;
      // console.log('API URL:', urlDeleteAdmissionPeriod);
      const response = await apiClient.post(urlDeleteAdmissionPeriod, authRequest);
      // console.log('API delete admissionPeriod Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListApi = createAsyncThunk(
  'admissionPeriod/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAdmissionPeriod= SERVER_API_URL + API_SELECT_LIST_ADMISSION_PERIOD;
      // console.log('API URL:', urlSelectListAdmissionPeriod);
      const response = await apiClient.post(urlSelectListAdmissionPeriod, authRequest);
      // console.log('API select list admissionPeriod Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);