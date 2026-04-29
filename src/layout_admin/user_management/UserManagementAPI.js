import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  SERVER_API_URL
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'users/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlCreateUser= SERVER_API_URL + "/users/create";
      console.log('API URL:', urlCreateUser);
      const response = await apiClient.post(urlCreateUser, authRequest);
      console.log('API create user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'users/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlUpdateUser= SERVER_API_URL + "/users/update";
      console.log('API URL:', urlUpdateUser);
      const response = await apiClient.put(urlUpdateUser, authRequest);
      console.log('API update user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'users/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlDeleteUser= SERVER_API_URL + "/users/delete";
      console.log('API URL:', urlDeleteUser);
      const response = await apiClient.delete(urlDeleteUser, authRequest);
      console.log('API delete user Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);