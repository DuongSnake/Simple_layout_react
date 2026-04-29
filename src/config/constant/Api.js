export const SERVER_API_URL = "http://localhost:8080/api";

const PRE_FIX_AUTH = '/auth/';
const PRE_FIX_USER = '/user/v1/';
const PRE_FIX_API = '/api/v1/';
/**
 * API.js
 */
export const APT_POST_SIGNIN = PRE_FIX_AUTH + 'login';
export const API_EXTEND_TOKEN = PRE_FIX_AUTH + 'extend';
export const API_CHANGE_PASSWORD = PRE_FIX_USER + 'changePassword';
export const API_CHANGE_LOGIN_PASSWORD = PRE_FIX_USER + 'changeLoginPassword';
export const API_FORGOT_PASSWORD = PRE_FIX_AUTH + 'forgotPassword';
export const API_RESET_PASSWORD = PRE_FIX_AUTH + 'resetPassword';