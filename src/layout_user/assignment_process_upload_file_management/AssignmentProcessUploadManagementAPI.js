import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClientUser } from '../../config/client/ApiClient.js';
import { getAuthToken } from '../../config/utils/FunctionGlobal.js';
import axios from "axios";
import {
SERVER_API_URL,
API_SELECT_LIST_ASSIGNMENT_PROCESS,
API_CREATE_LIST_FILE_ASSIGNMENT_PROCESS,
API_UPDATE_LIST_FILE_ASSIGNMENT_PROCESS,
API_SELECT_LIST_FILE_ASSIGNMENT_PROCESS,
API_DOWNLOAD_FILE_STUDENT_UPLOAD_USER_SIDE
} from '../../config/constant/Api.js';

export const insertListFileAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/insertListFileAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlCreateAssignmentRegister= SERVER_API_URL + API_CREATE_LIST_FILE_ASSIGNMENT_PROCESS;
      console.log('API URL:', urlCreateAssignmentRegister);
      const response = await apiClientUser.post(urlCreateAssignmentRegister, authRequest);
      console.log('API create assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateListFileAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/updateListFileAssignment',
  async (authRequest, { rejectWithValue }) => {
    try {
      console.log('authRequest is FormData:', authRequest instanceof FormData);
      if (authRequest instanceof FormData) {
        for (let [key, value] of authRequest.entries()) {
          console.log(`  ${key}:`, value);
        }
      }
      // console.log('authRequest:', authRequest);
      let urlUpdateAssignmentRegister= SERVER_API_URL + API_UPDATE_LIST_FILE_ASSIGNMENT_PROCESS;
      // console.log('API URL:', urlUpdateAssignmentRegister);
      const response = await apiClientUser.post(urlUpdateAssignmentRegister, authRequest);
      // console.log('API update assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/selectListAssApprove',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListAssignmentRegister= SERVER_API_URL + API_SELECT_LIST_ASSIGNMENT_PROCESS;
      // console.log('API URL:', urlSelectListAssignmentRegister);
      const response = await apiClientUser.post(urlSelectListAssignmentRegister, authRequest);
      // console.log('API select list assignmentRegister Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectListFileAssignmentProcessApi = createAsyncThunk(
  'assignmentRegister/selectListFileAss',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListFileAssignment= SERVER_API_URL + API_SELECT_LIST_FILE_ASSIGNMENT_PROCESS;
      // console.log('API URL:', urlSelectListFileAssignment);
      const response = await apiClientUser.post(urlSelectListFileAssignment, authRequest);
      // console.log('API select list file assignment Success Response:', response.data);
      return response.data;
    } catch (error) {
      // console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadFileStudentUploadApi = createAsyncThunk(
  'file/downloadFile',
  async (authRequest, { rejectWithValue }) => {
    try {
      let urlDownloadFile= SERVER_API_URL + API_DOWNLOAD_FILE_STUDENT_UPLOAD_USER_SIDE;
      const response = await apiClientUser.post(urlDownloadFile, authRequest);
      return response.data;
    } catch (error) {
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