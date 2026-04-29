import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';

import { APP_DATE_FORMAT, FORMAT_DATE_OUTPUT } from '../constant/Constants';
// import { NOTIFICATION } from 'app/config/constant/enum';
// import { openNotification, openNotificationAction } from 'app/shared/util/entity-utils';
import { checkSuccessDownload, getAuthToken } from '../utils/FunctionGlobal';
import { SERVER_API_URL } from '../../config/constant/Api';

export const apiClient = axios.create({
  baseURL: SERVER_API_URL,
  timeout: 15000,
  withCredentials: true,
});

export const downloadFileWithAxios = (urlApi, query, fileName) => {
  const token = getAuthToken();
  const newQuery = {
    userId: query.userId,
    requestTs: query.requestTs,
    lang: query.lang,
    ...query.data,
  };

  const queryUrl = queryString.stringify(newQuery);
  const requestUrl = `${SERVER_API_URL}${urlApi}?${queryUrl}`;

  axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      token,
    },
  })
    .then(response => {
      if (checkSuccessDownload(response)) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}${moment().format(APP_DATE_FORMAT)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Download error:', response.data.responseMsg);
        // openNotificationAction(NOTIFICATION.ERROR, 'message.download-error', '', response.data.responseMsg);
      }
    })
    .catch(error => {
      console.error('Download error:', error.message);
      // openNotification(NOTIFICATION.ERROR, '', '', error.message);
    });
};

export const downloadFileWithAxiosLoading = (urlApi, query, fileName, action) => {
  const token = getAuthToken();
  const newQuery = {
    userId: query.userId,
    requestTs: query.requestTs,
    lang: query.lang,
    ...query.data,
  };

  const queryUrl = queryString.stringify(newQuery);
  const requestUrl = `${SERVER_API_URL}${urlApi}?${queryUrl}`;

  axios({
    url: requestUrl,
    method: 'GET',
    responseType: 'blob',
    headers: {
      token,
    },
  })
    .then(response => {
      if (checkSuccessDownload(response)) {
        if (action) {
          action(false);
        }
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}${moment().format(FORMAT_DATE_OUTPUT)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        if (action) {
          action(false);
        }
        console.error('Download error:', response.data.responseMsg);
        //openNotificationAction(NOTIFICATION.ERROR, 'message.download-error', '', response.data.responseMsg);
      }
    })
    .catch(error => {
      if (action) {
        action(false);
      }
      console.error('Download error:', error.message);
      // openNotification(NOTIFICATION.ERROR, '', '', error.message);
    });
};
