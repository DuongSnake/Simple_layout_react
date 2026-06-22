import { useLocation, useNavigate } from "react-router-dom";
import { authenticate, changePassword } from "../admin_layout/AdminLoginAPI";
import { useDispatch, useSelector } from "react-redux";
import { ACCESS_TOKEN, USER_NAME, PAGE_LOGIN } from '../../config/constant/Constants';
import React, { useState, useEffect } from 'react';
function AdminLoginTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginDate] = useState({
    userName: '',
    password: ''
  });
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const { login } = useSelector(state => state.authentication);
  
  const handleLogin = async () => {
    try {
      const response = await dispatch(authenticate({ userName: loginData.userName, password: loginData.password }));
      const errorMessage = typeof response.payload === 'string'
        ? response.payload
        : response.payload?.responseMsg || response.payload?.message || 'Tên đăng nhập hoặc mật khẩu không hợp lệ.';

      if (response.type.endsWith('/fulfilled') && response.payload?.data?.token) {
        sessionStorage.setItem(ACCESS_TOKEN, response.payload.data.token);
        sessionStorage.setItem(PAGE_LOGIN, "admin");
        sessionStorage.setItem(USER_NAME, response.payload.data.username);

        const redirectUrl = location.state?.urlAfterLoginSuccess || "/admin/dashboard";
        if ("/admin/login" === location.state?.urlAfterLoginSuccess || "/admin/login" === location.state?.urlAfterLoginSuccess) {
          navigate("/admin/dashboard");
        } else {
          navigate(redirectUrl);
        }
      } else {
        console.error("Login failed:", response.payload);
        setErrorModalMessage(errorMessage);
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorModalMessage(error.message || 'Lỗi khi gọi API.');
      setIsErrorModalOpen(true);
    }
  };

  const closeErrorModal = () => setIsErrorModalOpen(false);
  // Handler for search form input changes
  const handleInputChangeSearch = (event) => {
    const { name, value } = event.target;
    setLoginDate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">

    <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Đăng nhập admin
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
                <a href="/admin/forgot-password" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Đặt lại mật khẩu?</a>
            </div>
            <button class="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
             onClick={handleLogin}>{login.loading ? "Đang điều hướng..." : "Đăng nhập"}</button>
        </div>
    </div>
    {isErrorModalOpen && (
      <div
        onClick={closeErrorModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
        role="dialog"
        aria-modal="true"
      >
        <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={closeErrorModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">{errorModalMessage}</h3>
              <button
                type="button"
                onClick={closeErrorModal}
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
</div>
  );
}

export default AdminLoginTemplate;