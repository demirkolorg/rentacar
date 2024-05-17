import { axiosInstance } from '@/api';

const _prefix = '/upload';

export const imageUpload = async payload => {
  const response = await axiosInstance('post', `${_prefix}/image`, payload);
  return response;
};
