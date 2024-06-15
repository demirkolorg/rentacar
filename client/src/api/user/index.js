import { axiosInstance, axiosInstanceSystem } from '@/api';

const _prefix = '/user';

export const XgetUser = async payload => {
  const response = await axiosInstanceSystem('post', `${_prefix}/getUser`, payload);
  return response;
};

export const userGetAll = async params => {
  const response = await axiosInstance('post', `${_prefix}/getAll`, {}, params);
  return response;
};
export const userGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const userAdd = async data => {
  const response = await axiosInstance('post', `${_prefix}/add`, data);
  return response;
};
export const userUpdate = async data => {
  const response = await axiosInstance('post', `${_prefix}/update`, data);
  return response;
};

export const userDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/delete`, data);
  return response;
};
export const userDurumDegistir = async data => {
  const response = await axiosInstance('post', `${_prefix}/durumDegistir`, data);
  return response;
};
