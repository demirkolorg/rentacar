import axios from "axios";
import { toast as message } from "react-toastify";
import { eventBus } from "./eventBus";

const _apiPrefix = "/api/v1";

export const axiosInstance = async (method, endpoint, data, params) => {
  try {
    const response = await axios({
      baseURL: "http://localhost:5777",
      method,
      url: `${_apiPrefix}${endpoint}`,
      data,
      params,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response; // Başarılı yanıtı döndür
  } catch (error) {
    // HTTP status koduna göre hata kontrolü
    if (error.response) {
      //veritabanındaki benzersizlik kuralının çiğnenmesi gibi çakışma durumlarında önerilir.
      if (error.response.status === 409) {
        message.error(error.response.data.message.desc);
      } else if (error.response.status === 401) {
        // 401 Unauthorized durumu
        message.error(
          "Yetkisiz Erişim: Geçersiz kimlik bilgileri nedeniyle erişim reddedildi. Giriş sayfasına yönlendiriliyorsunuz.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }
        );

        // 2000 milisaniye (2 saniye) sonra 'unauthorized' olayını tetikle
        setTimeout(() => {
          eventBus.emit("unauthorized");
        }, 5000);
      } else {
        // Diğer hatalar için genel hata mesajı
        message.error(error.response.data.message.desc);
      }
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      message.error("API Error: No response received.");
    } else {
      // İstek yapılmadan bir hata oluştu
      message.error("API Error:", error.message);
    }
    // Hata nesnesini döndürerek çağıran kodun bu hatayı işlemesine olanak tanı
    return Promise.reject(error);
  }
};
