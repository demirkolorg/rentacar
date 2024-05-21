import { axiosInstance } from '@/api';

const _prefix = '/pozisyon';

export const pozisyonGetAll = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/getAll`, data, { params });
  return response;
};
export const pozisyonGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const pozisyonAdd = async data => {
  const response = await axiosInstance('post', `${_prefix}/add`, data);
  return response;
};
export const pozisyonUpdate = async data => {
  const response = await axiosInstance('post', `${_prefix}/update`, data);
  return response;
};

export const pozisyonDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/delete`, data);
  return response;
};
export const pozisyonDurumDegistir = async data => {
  const response = await axiosInstance('post', `${_prefix}/durumDegistir`, data);
  return response;
};
