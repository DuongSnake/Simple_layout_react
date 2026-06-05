import { apiClient } from '../../config/client/ApiClient.js';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  SERVER_API_URL,
  API_SELECT_ALL_TOTAL_RECORD_BY_YEAR,
  API_SELECT_TOP_5_PERIOD_BY_YEAR,
  API_SELECT_TOP_5_INSTRUCTOR_BY_YEAR
} from '../../config/constant/Api';

export const selectListTotalRecordsByYearApi = createAsyncThunk(
  'reportYear/selectAllTotalRecrod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListTotalRecords = SERVER_API_URL + API_SELECT_ALL_TOTAL_RECORD_BY_YEAR;
      // console.log('API URL:', urlSelectListTotalRecords);
      const response = await apiClient.post(urlSelectListTotalRecords, authRequest);
      // console.log('API select list total records Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListTop5PeriodByYearApi = createAsyncThunk(
  'reportYear/selectTop5Period',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListTotalRecords = SERVER_API_URL + API_SELECT_TOP_5_PERIOD_BY_YEAR;
      // console.log('API URL:', urlSelectListTotalRecords);
      const response = await apiClient.post(urlSelectListTotalRecords, authRequest);
      // console.log('API select list total records Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListTop5InstructorByYearApi = createAsyncThunk(
  'reportYear/selectTop5Instructor',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListTotalRecords = SERVER_API_URL + API_SELECT_TOP_5_INSTRUCTOR_BY_YEAR;
      // console.log('API URL:', urlSelectListTotalRecords);
      const response = await apiClient.post(urlSelectListTotalRecords, authRequest);
      // console.log('API select list total records Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
