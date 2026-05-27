import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_CREATE_SCORE_ASSIGNMENT,
  API_UPDATE_SCORE_ASSIGNMENT,
  API_DELETE_SCORE_ASSIGNMENT,
  API_SELECT_LIST_SCORE_ASSIGNMENT,
  API_SELECT_LIST_ASSIGNMENT_BY_PERIOD_TIME
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'scoreAssignment/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateScore = SERVER_API_URL + API_CREATE_SCORE_ASSIGNMENT;
      const response = await apiClient.post(urlCreateScore, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'scoreAssignment/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlUpdateScore = SERVER_API_URL + API_UPDATE_SCORE_ASSIGNMENT;
      const response = await apiClient.post(urlUpdateScore, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'scoreAssignment/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlDeleteScore = SERVER_API_URL + API_DELETE_SCORE_ASSIGNMENT;
      const response = await apiClient.post(urlDeleteScore, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListApiScoresApi = createAsyncThunk(
  'scoreAssignment/selectList',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListScore = SERVER_API_URL + API_SELECT_LIST_SCORE_ASSIGNMENT;
      // console.log('API URL:', urlSelectListScore);
      const response = await apiClient.post(urlSelectListScore, authRequest);
      // console.log('API select list Score Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentByPeriodTimeApi = createAsyncThunk(
  'scoreAssignment/selectListNewScoreAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListScore = SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_BY_PERIOD_TIME;
      // console.log('API URL:', urlSelectListScore);
      const response = await apiClient.post(urlSelectListScore, authRequest);
      // console.log('API select list Score Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
