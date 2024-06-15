import axios from 'axios';
import { toast as message } from 'react-toastify';
import { eventBus } from './eventBus';

const _apiPrefix = '/api/v1';
const SYSTEM_REQUEST_TOKEN = 'F7A1C2D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F7';

export const axiosInstance = async (method, endpoint, data, params) => {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const response = await axios({
      baseURL: 'http://localhost:5777',
      method,
      url: `${_apiPrefix}${endpoint}`,
      data,
      params,
      headers: {
        authorization: token
      }
    });
    return response; // Başarılı yanıtı döndür
  } catch (error) {
    // HTTP status koduna göre hata kontrolü
    if (error.response) {
      //veritabanındaki benzersizlik kuralının çiğnenmesi gibi çakışma durumlarında önerilir.
      if (error.response.status === 409) {
        message.error(error.response.data.message);
      } else if (error.response.status === 401) {
        // 401 Unauthorized durumu
        message.error('Yetkisiz Erişim: Geçersiz kimlik bilgileri nedeniyle erişim reddedildi. Giriş sayfasına yönlendiriliyorsunuz.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'colored'
        });

        // 2000 milisaniye (2 saniye) sonra 'unauthorized' olayını tetikle
        setTimeout(() => {
          eventBus.emit('unauthorized');
        }, 5000);
      } else {
        // Diğer hatalar için genel hata mesajı
        message.error(error.response.data.message);
      }
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      message.error('API Error: No response received.');
    } else {
      // İstek yapılmadan bir hata oluştu
      message.error('API Error:', error.message);
    }
    // Hata nesnesini döndürerek çağıran kodun bu hatayı işlemesine olanak tanı
    return Promise.reject(error);
  }
};
export const axiosInstanceSystem = async (method, endpoint, data, params) => {
  try {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const sytemtoken=token + '!a+s%y&a?' + SYSTEM_REQUEST_TOKEN
    const response = await axios({
      baseURL: 'http://localhost:5777',
      method,
      url: `${_apiPrefix}${endpoint}`,
      data,
      params,
      headers: {
        authorization: sytemtoken
      }
    });
    return response; // Başarılı yanıtı döndür
  } catch (error) {
    // HTTP status koduna göre hata kontrolü
    if (error.response) {
      //veritabanındaki benzersizlik kuralının çiğnenmesi gibi çakışma durumlarında önerilir.
      if (error.response.status === 409) {
        message.error(error.response.data.message);
      } else if (error.response.status === 401) {
        // 401 Unauthorized durumu
        message.error('Yetkisiz Erişim: Geçersiz kimlik bilgileri nedeniyle erişim reddedildi. Giriş sayfasına yönlendiriliyorsunuz.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'colored'
        });

        // 2000 milisaniye (2 saniye) sonra 'unauthorized' olayını tetikle
        setTimeout(() => {
          eventBus.emit('unauthorized');
        }, 5000);
      } else {
        // Diğer hatalar için genel hata mesajı
        message.error(error.response.data.message);
      }
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      message.error('API Error: No response received.');
    } else {
      // İstek yapılmadan bir hata oluştu
      message.error('API Error:', error.message);
    }
    // Hata nesnesini döndürerek çağıran kodun bu hatayı işlemesine olanak tanı
    return Promise.reject(error);
  }
};
