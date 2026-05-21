import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import {
  API_CHANGE_LOGIN_PASSWORD,
  API_CHANGE_PASSWORD,
  API_EXTEND_TOKEN,
  API_FORGOT_PASSWORD,
  API_RESET_PASSWORD,
  APT_POST_SIGNIN,
  SERVER_API_URL,
  API_FIND_USER_ID_BY_USERNAME
} from '../../config/constant/Api';

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlLogin= SERVER_API_URL + APT_POST_SIGNIN;
      console.log('API URL:', urlLogin);
      const response = await apiClient.post(urlLogin, authRequest);
      console.log('API Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'authentication/reset-password',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlResetPassword= SERVER_API_URL + API_RESET_PASSWORD;
      console.log('API URL:', urlResetPassword);
      const response = await apiClient.post(urlResetPassword, authRequest);
      console.log('API Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'authentication/change-password',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlChangePassword= SERVER_API_URL + API_CHANGE_PASSWORD;
      console.log('API URL:', urlChangePassword);
      const response = await apiClient.post(urlChangePassword, authRequest);
      console.log('API Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const findUserIdByUsername = createAsyncThunk(
  'authentication/find-id',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest:', authRequest);
      let urlFindUserId= SERVER_API_URL + API_FIND_USER_ID_BY_USERNAME;
      console.log('API URL:', urlFindUserId);
      const response = await apiClient.post(urlFindUserId, authRequest);
      return response.data.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);