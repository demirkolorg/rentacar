import { axiosInstance } from '@/api';

const _prefix = '/firmaPersonel';

export const firmaPersonelGetAll = async params => {
  const response = await axiosInstance('post', `${_prefix}/getAll`, {}, params);
  return response;
};
export const firmaPersonelGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const firmaPersonelAdd = async data => {
  const response = await axiosInstance('post', `${_prefix}/add`, data);
  return response;
};
export const firmaPersonelUpdate = async data => {
  const response = await axiosInstance('post', `${_prefix}/update`, data);
  return response;
};

export const firmaPersonelDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/delete`, data);
  return response;
};
export const firmaPersonelDurumDegistir = async data => {
  const response = await axiosInstance('post', `${_prefix}/durumDegistir`, data);
  return response;
};
