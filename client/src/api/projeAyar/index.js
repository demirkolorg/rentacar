import { axiosInstance } from '@/api';

const _prefix = '/projeAyar';

export const getSuperAdminMail = async payload => {
  const response = await axiosInstance('get', `${_prefix}/superAdminMail`, payload);
  return response;
};
