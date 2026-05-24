import { useLocation, useNavigate } from "react-router-dom";
import { authenticate, changePasswordNoAuthApi } from "./AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";
import { ACCESS_TOKEN, USER_NAME, PAGE_LOGIN } from '../../config/constant/Constants';
import React, { useState, useEffect } from 'react';
function AdminResetPasswordTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginDate] = useState({
    userName: '',
    currentPassword: '',
    newPassword: ''
  });
  const { changePassword: changePasswordState } = useSelector(state => state.authentication);

  // Handler for search form input changes
  const handleInputChangeSearch = (event) => {
    const { name, value } = event.target;
    setLoginDate((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleChangePassword = async () => {
    console.log(loginData.userName+"  oldPassword:"+loginData.oldPassword+"  newPassword:"+loginData.newPassword);
    try {
      const response = await dispatch(changePasswordNoAuthApi({ userName: loginData.userName, currentPassword: loginData.currentPassword, newPassword: loginData.newPassword}));
      // Check if password change was successful
      if (response.type.endsWith('/fulfilled')) {
        navigate("/admin/login");
      } else {
        console.error("Failed to change password:", response.payload);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
    <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Đặt lại mật khẩu 
        </h2>
        <div class="mt-8 space-y-6" action="#">
            <div>
                <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                <input type="text" name="userName" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@company.com" required
                 onChange={handleInputChangeSearch} />
            </div>
            <div>
                <label for="currentPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                <input type="password" name="currentPassword" id="currentPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required
                onChange={handleInputChangeSearch} />
            </div>
            <div>
                <label for="newPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                <input type="password" name="newPassword" id="newPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required
                onChange={handleInputChangeSearch} />
            </div>
            <button class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
             onClick={handleChangePassword}>Đặt lại mật khẩu</button>
        </div>
    </div>
</div>
  );
}

export default AdminResetPasswordTemplate;