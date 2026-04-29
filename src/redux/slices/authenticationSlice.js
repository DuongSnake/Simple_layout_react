import { createSlice } from '@reduxjs/toolkit';
import { authenticate, resetPassword, changePassword } from '../../layout_login/admin_layout/AdminLoginAPI';

const initialState = {
  login: {
    data: null,
    loading: false,
    error: null,
  },
  resetPassword: {
    data: null,
    loading: false,
    error: null,
  },
  changePassword: {
    data: null,
    loading: false,
    error: null,
  },
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  extraReducers: (builder) => {
    // Login handlers
    builder
      .addCase(authenticate.pending, (state) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload;
        state.login.error = null;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload || action.error.message;
      })
      // Reset Password handlers
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.loading = true;
        state.resetPassword.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.loading = false;
        state.resetPassword.data = action.payload;
        state.resetPassword.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.loading = false;
        state.resetPassword.error = action.payload || action.error.message;
      })
      // Change Password handlers
      .addCase(changePassword.pending, (state) => {
        state.changePassword.loading = true;
        state.changePassword.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePassword.loading = false;
        state.changePassword.data = action.payload;
        state.changePassword.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePassword.loading = false;
        state.changePassword.error = action.payload || action.error.message;
      });
  },
});

export default authenticationSlice.reducer;
