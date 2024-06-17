import { axiosInstance } from '@/api';

const _prefix = '/pozisyon';

export const pozisyonGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const pozisyonGetWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getWithPopulate`, data);
  return response;
};
export const pozisyonGetIds = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIds`, data);
  return response;
};
export const pozisyonGetIdsWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIdsWithPopulate`, data);
  return response;
};
export const pozisyonList = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/list`, data, { params });
  return response;
};
export const pozisyonListWithPopulate = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/listWithPopulate`, data, { params });
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

export const pozisyonActive = async data => {
  const response = await axiosInstance('post', `${_prefix}/active`, data);
  return response;
};
export const pozisyonPassive = async data => {
  const response = await axiosInstance('post', `${_prefix}/passive`, data);
  return response;
};
export const pozisyonArchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/archive`, data);
  return response;
};
export const pozisyonUnarchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/unarchive`, data);
  return response;
};
export const pozisyonSoftDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/softDelete`, data);
  return response;
};
export const pozisyonRestore = async data => {
  const response = await axiosInstance('post', `${_prefix}/restore`, data);
  return response;
};
export const pozisyonHardDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/hardDelete`, data);
  return response;
};
