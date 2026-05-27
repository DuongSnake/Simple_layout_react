import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../config/client/ApiClient.js';
import { getAuthToken } from '../../config/utils/FunctionGlobal.js';
import axios from "axios";
import {
  SERVER_API_URL,
  API_CREATE_FILE_UPLOAD,
  API_UPDATE_FILE_UPLOAD,
  API_DELETE_FILE_UPLOAD,
  API_SELECT_LIST_FILE_UPLOAD,
  API_SELECT_LIST_ASSIGNMENT_BY_ADMISSION_TIME,
  API_DOWNLOAD_FILE_STUDENT_UPLOAD_USER_SIDE
} from '../../config/constant/Api';

export const createApi = createAsyncThunk(
  'file/create',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateScore = SERVER_API_URL + API_CREATE_FILE_UPLOAD;
      const response = await apiClient.post(urlCreateScore, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateApi = createAsyncThunk(
  'file/update',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlUpdateScore = SERVER_API_URL + API_UPDATE_FILE_UPLOAD;
      const response = await apiClient.post(urlUpdateScore, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteApi = createAsyncThunk(
  'file/delete',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlDeleteScore = SERVER_API_URL + API_DELETE_FILE_UPLOAD;
      const response = await apiClient.post(urlDeleteScore, authRequest);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListFileUploadApi = createAsyncThunk(
  'file/selectList2',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListScore = SERVER_API_URL + API_SELECT_LIST_FILE_UPLOAD;
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
  'file/selectListAssignmentByAdmissionTime',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListScore = SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_BY_ADMISSION_TIME;
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

export const downloadFileAssignmentProcessApi = async (fileId) => {

    const token = getAuthToken();

    return await axios.post(
        SERVER_API_URL + API_DOWNLOAD_FILE_STUDENT_UPLOAD_USER_SIDE,
        {
            fileId: fileId
        },
        {
            responseType: "blob",

            headers: {
                Authorization: token
                    ? `Bearer ${token}`
                    : "",

                token: token || "",

                lang: "vi"
            }
        }
    );
};
