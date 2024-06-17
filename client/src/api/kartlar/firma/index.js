import { axiosInstance } from '@/api';

const _prefix = '/firma';


export const firmaGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const firmaGetWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getWithPopulate`, data);
  return response;
};
export const firmaGetIds = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIds`, data);
  return response;
};
export const firmaGetIdsWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIdsWithPopulate`, data);
  return response;
};
export const firmaList = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/list`, data, { params });
  return response;
};
export const firmaListWithPopulate = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/listWithPopulate`, data, { params });
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

export const firmaActive = async data => {
  const response = await axiosInstance('post', `${_prefix}/active`, data);
  return response;
};
export const firmaPassive = async data => {
  const response = await axiosInstance('post', `${_prefix}/passive`, data);
  return response;
};
export const firmaArchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/archive`, data);
  return response;
};
export const firmaUnarchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/unarchive`, data);
  return response;
};
export const firmaSoftDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/softDelete`, data);
  return response;
};
export const firmaRestore = async data => {
  const response = await axiosInstance('post', `${_prefix}/restore`, data);
  return response;
};
export const firmaHardDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/hardDelete`, data);
  return response;
};