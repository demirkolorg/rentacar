import { axiosInstance } from '@/api';

const _prefix = '/firma';

export const firmaGetAll = async params => {
  const response = await axiosInstance('post', `${_prefix}/getAll`, {}, params);
  return response;
};
export const firmaGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const firmaAdd = async data => {
  const response = await axiosInstance('post', `${_prefix}/add`, data);
  return response;
};
export const firmaUpdate = async data => {
  const response = await axiosInstance('post', `${_prefix}/update`, data);
  return response;
};

export const firmaDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/delete`, data);
  return response;
};
export const firmaDurumDegistir = async data => {
  const response = await axiosInstance('post', `${_prefix}/durumDegistir`, data);
  return response;
};
