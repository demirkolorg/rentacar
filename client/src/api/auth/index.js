import { axiosInstance } from '@/api';

const _prefix = '/auth';

export const login = async payload => {
  
  const response = await axiosInstance('post', `${_prefix}/login`, payload);
  return response;
};

export const register = async payload => {
  const response = await axiosInstance('post', `${_prefix}/register`, payload);
  return response;
};
