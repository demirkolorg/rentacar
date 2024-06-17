import { axiosInstance } from '@/api';

const _prefix = '/sube';

export const subeGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const subeGetWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getWithPopulate`, data);
  return response;
};
export const subeGetIds = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIds`, data);
  return response;
};
export const subeGetIdsWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIdsWithPopulate`, data);
  return response;
};
export const subeList = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/list`, data, { params });
  return response;
};
export const subeListWithPopulate = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/listWithPopulate`, data, { params });
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

export const subeActive = async data => {
  const response = await axiosInstance('post', `${_prefix}/active`, data);
  return response;
};
export const subePassive = async data => {
  const response = await axiosInstance('post', `${_prefix}/passive`, data);
  return response;
};
export const subeArchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/archive`, data);
  return response;
};
export const subeUnarchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/unarchive`, data);
  return response;
};
export const subeSoftDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/softDelete`, data);
  return response;
};
export const subeRestore = async data => {
  const response = await axiosInstance('post', `${_prefix}/restore`, data);
  return response;
};
export const subeHardDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/hardDelete`, data);
  return response;
};
