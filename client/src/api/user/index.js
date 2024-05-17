import { axiosInstance } from '@/api';

const _prefix = '/user';

export const getUser = async payload => {
  const response = await axiosInstance('post', `${_prefix}/getUser`, payload);
  return response;
};
