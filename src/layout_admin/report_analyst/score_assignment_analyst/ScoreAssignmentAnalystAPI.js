import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../../config/client/ApiClient.js';
import {
  SERVER_API_URL,
  API_SELECT_ALL_SCORE_ASSIGNMENT_REGISTER_ANALYST,
  API_EXPORT_EXCEL_BY_YEAR_LIST_SCORE_ASSIGNMENT
} from '../../../config/constant/Api.js';
import axios from "axios";
import { getAuthToken } from '../../../config/utils/FunctionGlobal.js';


export const selectListScoreAssignmentRegisterAnalystApi = createAsyncThunk(
  'reportScoreAssignmentByMajor/selectAllTotalRecrod',
  async (authRequest, { rejectWithValue }) => {
    try {
      // console.log('authRequest:', authRequest);
      let urlSelectListScoreAssignmentRegisterAnalyst = SERVER_API_URL + API_SELECT_ALL_SCORE_ASSIGNMENT_REGISTER_ANALYST;
      // console.log('API URL:', urlSelectListScoreAssignmentRegisterAnalyst);
      const response = await apiClient.post(urlSelectListScoreAssignmentRegisterAnalyst, authRequest);
      // console.log('API select list score assignment register analyst Success Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadFileScoreAssignmentProcessApi = async (authRequest) => {

    const token = getAuthToken();

    return await axios.post(
      //De thu url cu de test thu
        SERVER_API_URL + API_EXPORT_EXCEL_BY_YEAR_LIST_SCORE_ASSIGNMENT,
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

