export const SERVER_API_URL = "http://localhost:8080";

const PRE_FIX_AUTH = '/api/auth/';
const PRE_FIX_USER = '/user/v1/';
const PRE_FIX_API = '/api/v1/';
/**
 * Authentication API endpoints
 */
export const APT_POST_SIGNIN = PRE_FIX_AUTH + 'login';
export const API_EXTEND_TOKEN = PRE_FIX_AUTH + 'extend';
export const API_CHANGE_PASSWORD = PRE_FIX_USER + 'changePassword';
export const API_CHANGE_LOGIN_PASSWORD = PRE_FIX_USER + 'changeLoginPassword';
export const API_FORGOT_PASSWORD = PRE_FIX_AUTH + 'forgotPassword';
export const API_RESET_PASSWORD = PRE_FIX_AUTH + 'resetPassword';
/**
 * User management API endpoints
 */
export const API_CREATE_USER = PRE_FIX_API + 'user/insert';
export const API_UPDATE_USER = PRE_FIX_API + 'user/update';
export const API_DELETE_USER = PRE_FIX_API + 'user/delete';
export const API_SELECT_LIST_USER = PRE_FIX_API + 'user/selectList';
export const API_SELECT_ALL_ROLES = PRE_FIX_API + 'user/selectAllRole';
