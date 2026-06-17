import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_ALL_STUDENT_REGISTER_ANALYST,
  API_EXPORT_EXCEL_BY_YEAR_LIST_STUDENT,
} from '../../../config/constant/Api.js';
import axios from "axios";
import { getAuthToken } from '../../../config/utils/FunctionGlobal.js';


export const selectListStudentRegisterAnalystApi = createAsyncThunk(
  'reportStudentByMajor/selectAllTotalRecrod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListStudentRegisterAnalyst = SERVER_API_URL + API_SELECT_ALL_STUDENT_REGISTER_ANALYST;
      // console.log('API URL:', urlSelectListStudentRegisterAnalyst);
      const response = await apiClient.post(urlSelectListStudentRegisterAnalyst, authRequest);
      // console.log('API select list student register analyst Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadFileAssignmentProcessApi = async (authRequest) => {

    const token = getAuthToken();

    return await axios.post(
        SERVER_API_URL + API_EXPORT_EXCEL_BY_YEAR_LIST_STUDENT,
        authRequest,
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
