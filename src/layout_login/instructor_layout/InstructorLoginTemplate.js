import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_INSTRUCTOR, USER_NAME_INSTRUCTOR, PAGE_LOGIN } from '../../config/constant/Constants';
import { authenticate } from "../admin_layout/AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';

function InstructorLoginTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginDate] = useState({
    userName: '',
    password: ''
  });
  const { login, changePassword: changePasswordState } = useSelector(state => state.authentication);

  const handleLogin = async () => {
    try {
      const response = await dispatch(authenticate({ userName: loginData.userName, password: loginData.password }));
      // Check if login was successful
      if (response.type.endsWith('/fulfilled')) {
        console.log("Login successful:", response.payload);
        // Store token and user info
        if (response.payload.data != null && response.payload.data.token) {
          sessionStorage.setItem(ACCESS_TOKEN_INSTRUCTOR, response.payload.data.token);
          // sessionStorage.setItem(PAGE_LOGIN, "instructor");
          sessionStorage.setItem(USER_NAME_INSTRUCTOR, response.payload.data.username);
        }
        // Redirect to assignment-register
        const redirectUrl = location.state?.urlAfterLoginSuccess || "/instructor/assignment-register-management";
        if("/instructor/login" == location.state?.urlAfterLoginSuccess ||"/instructor/login" == location.state?.urlAfterLoginSuccess){
        navigate("/instructor/assignment-register-management");
        }else{
        navigate(redirectUrl);
        }
      } else {
        console.error("Login failed:", response.payload);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }; 
  // Handler for search form input changes
  const handleInputChangeSearch = (event) => {
    const { name, value } = event.target;
    setLoginDate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">

    <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Đăng nhập giảnh viên
        </h2>
        <div class="mt-8 space-y-6" action="#">
            <div>
                <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                <input type="text" name="userName" id="userName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="name@company.com" required
                 onChange={handleInputChangeSearch} />
            </div>
            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required
                onChange={handleInputChangeSearch} />
            </div>
            <div class="flex items-start">
                <a href="/instructor/forgot-password" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Đặt lại mật khẩu?</a>
            </div>
            <button class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
             onClick={handleLogin}>{login.loading ? "Đang điều hướng..." : "Đăng nhập"}</button>
        </div>
    </div>
</div>
  );
}
export default InstructorLoginTemplate;