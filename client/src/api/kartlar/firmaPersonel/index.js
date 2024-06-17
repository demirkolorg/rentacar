import { axiosInstance } from '@/api';

const _prefix = '/firmaPersonel';


export const firmaPersonelGet = async data => {
  const response = await axiosInstance('post', `${_prefix}/get`, data);
  return response;
};
export const firmaPersonelGetWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getWithPopulate`, data);
  return response;
};
export const firmaPersonelGetIds = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIds`, data);
  return response;
};
export const firmaPersonelGetIdsWithPopulate = async data => {
  const response = await axiosInstance('post', `${_prefix}/getIdsWithPopulate`, data);
  return response;
};
export const firmaPersonelList = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/list`, data, { params });
  return response;
};
export const firmaPersonelListWithPopulate = async (data, params) => {
  const response = await axiosInstance('post', `${_prefix}/listWithPopulate`, data, { params });
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

export const firmaPersonelActive = async data => {
  const response = await axiosInstance('post', `${_prefix}/active`, data);
  return response;
};
export const firmaPersonelPassive = async data => {
  const response = await axiosInstance('post', `${_prefix}/passive`, data);
  return response;
};
export const firmaPersonelArchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/archive`, data);
  return response;
};
export const firmaPersonelUnarchive = async data => {
  const response = await axiosInstance('post', `${_prefix}/unarchive`, data);
  return response;
};
export const firmaPersonelSoftDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/softDelete`, data);
  return response;
};
export const firmaPersonelRestore = async data => {
  const response = await axiosInstance('post', `${_prefix}/restore`, data);
  return response;
};
export const firmaPersonelHardDelete = async data => {
  const response = await axiosInstance('post', `${_prefix}/hardDelete`, data);
  return response;
};
