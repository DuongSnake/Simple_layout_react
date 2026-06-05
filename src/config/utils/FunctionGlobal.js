import { ACCESS_TOKEN, ACCESS_TOKEN_INSTRUCTOR, ACCESS_TOKEN_USER, USER_NAME } from '../constant/Constants';
import  { jwtDecode,JwtPayload } from 'jwt-decode';
const Storage = {
  session: {
    get: (key) => sessionStorage.getItem(key),
    set: (key, value) => sessionStorage.setItem(key, value)
  }
};
export const getAuthToken = () => Storage.session.get(ACCESS_TOKEN);
export const getAuthTokenUser = () => Storage.session.get(ACCESS_TOKEN_USER);
export const getAuthTokeInstructor = () => Storage.session.get(ACCESS_TOKEN_INSTRUCTOR);

export const getUserId = () => {
  const accessToken = getAuthToken();

  if (accessToken) {
    const jwtPayload = jwtDecode(accessToken);

    return jwtPayload['userId'];
  }
};

export const getUserName = () => {
  //At login will set userName to sessionStorage
  const userName = Storage.session.get(USER_NAME);

  if (userName) {
    return userName;
  }
  return '';
};

export const checkSuccessDownload = res => {
  return res.status === 200 && res.data.size > 203; // 203 is content of response status fail
};