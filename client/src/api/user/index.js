import { axiosInstance, axiosInstanceSystem } from '@/api';

const _prefix = '/user';

export const XgetUser = async payload => {
  const response = await axiosInstanceSystem('post', `${_prefix}/getUser`, payload);
  return response;
};


export const userGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const userGetWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getWithPopulate`, data);
  return response;
};
export const userGetIds = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIds`, data);
  return response;
};
export const userGetIdsWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIdsWithPopulate`, data);
  return response;
};
export const userList = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/list`, data, { params });
  return response;
};
export const userListWithPopulate = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/listWithPopulate`, data, { params });
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

export const userActive = async data => {
  const response = await axiosInstance('post', `${_prefix}/active`, data);
  return response;
};
export const userPassive = async data => {
  const response = await axiosInstance('post', `${_prefix}/passive`, data);
  return response;
};
export const userArchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/archive`, data);
  return response;
};
export const userUnarchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/unarchive`, data);
  return response;
};
export const userSoftDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/softDelete`, data);
  return response;
};
export const userRestore = async data => {
  const response = await axiosInstance('post', `${_prefix}/restore`, data);
  return response;
};
export const userHardDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/hardDelete`, data);
  return response;
};
