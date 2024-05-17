import { axiosInstance } from '@/api';

const _prefix = '/sube';

export const subeGetAll = async params => {
  const response = await axiosInstance('post', `${_prefix}/getAll`, {}, params);
  return response;
};
export const subeGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};

export const subeGetIds = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIds`, data);
  return response;
};

export const subeAdd = async data => {
  const response = await axiosInstance('post', `${_prefix}/add`, data);
  return response;
};
export const subeUpdate = async data => {
  const response = await axiosInstance('post', `${_prefix}/update`, data);
  return response;
};

export const subeDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/delete`, data);
  return response;
};
export const subeDurumDegistir = async data => {
  const response = await axiosInstance('post', `${_prefix}/durumDegistir`, data);
  return response;
};
