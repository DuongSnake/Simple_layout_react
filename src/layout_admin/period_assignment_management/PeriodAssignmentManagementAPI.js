import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
SERVER_API_URL,
API_SELECT_LIST_PERIOD_ASSIGNMENT,
API_CREATE_PERIOD_ASSIGNMENT,
API_UPDATE_PERIOD_ASSIGNMENT,
API_DELETE_PERIOD_ASSIGNMENT,
API_SELECT_PERIOD_ASSIGNMENT
} from '../../config/constant/Api.js';

export const createApi = createAsyncThunk(
  'periodAssignment/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlCreateperiodAssignment= SERVER_API_URL + API_CREATE_PERIOD_ASSIGNMENT;
      // console.log('API URL:', urlCreateperiodAssignment);
      const response = await apiClient.post(urlCreateperiodAssignment, authRequest);
      // console.log('API create periodAssignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'periodAssignment/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlUpdateperiodAssignment= SERVER_API_URL + API_UPDATE_PERIOD_ASSIGNMENT;
      // console.log('API URL:', urlUpdateperiodAssignment);
      const response = await apiClient.post(urlUpdateperiodAssignment, authRequest);
      // console.log('API update periodAssignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'periodAssignment/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlDeleteperiodAssignment= SERVER_API_URL + API_DELETE_PERIOD_ASSIGNMENT;
      // console.log('API URL:', urlDeleteperiodAssignment);
      const response = await apiClient.post(urlDeleteperiodAssignment, authRequest);
      // console.log('API delete periodAssignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListPeriodAssignmentApi = createAsyncThunk(
  'periodAssignment/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListperiodAssignment= SERVER_API_URL + API_SELECT_LIST_PERIOD_ASSIGNMENT;
      // console.log('API URL:', urlSelectListperiodAssignment);
      const response = await apiClient.post(urlSelectListperiodAssignment, authRequest);
      // console.log('API select list periodAssignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);