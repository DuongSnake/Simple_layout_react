import { Storage } from 'react-jhipster';
import { getDateTimeNow } from '../util/date-utils';
import { LOCALE } from 'app/config/constant/constants';
import { getUserId } from '../util/store-utils';

const language = Storage.local.get(LOCALE);

// export interface IParamCommon {
//   userId;
//   requestTs;
//   lang;
//   data?;
//   list?;
//   page?;
// }

// export interface IResponseCommon {
//   responseCd;
//   responseMsg;
//   responseTs;
//   data?;
//   data2?;
//   errors?;
//   list?;
//   totalAcolAmt?;
//   totalAcolTransactions?;
//   totalEcolAmt?;
//   totalEcolTransactions?;
//   transAmt?;
//   transNumber?;
//   totalRecord?;
//   totalSuccessRecord?;
//   totalWaitingRecord?;
//   totalFailRecord?;
//   totalAmount?;
//   unreceivedAmt?;
//   receivedAmt?;
// }

export const createCommonIParams = (data) => {
  return {
    userId: getUserId(),
    requestTs: getDateTimeNow(),
    lang: language || 'vi',
    data,
  };
};

export const createCommonIParamsDataPage = (data, page) => {
  return {
    userId: getUserId(),
    requestTs: getDateTimeNow(),
    lang: language || 'vi',
    data,
    page,
  };
};

// export interface IPaging {
//   pageNum;
//   pageSize;
// }

export const createCommonIParamsList = (list) => {
  return {
    userId: getUserId(),
    requestTs: getDateTimeNow(),
    lang: language || 'vi',
    list,
  };
};

// export interface IParamForgotPassword {
//   email;
// }

// export interface IParamCodeCheck {
//   code;
// }

// export interface IParamReset {
//   userId;
// }

// export interface IParamResetPassword {
//   userId;
//   newPassword;
// }
