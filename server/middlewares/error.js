const response = require("../lib/response");

// errorMiddleware.js
const errorHandler = (err, req, res, next) => {
    // Hata durum kodunu kontrol edin, yoksa 500 (Sunucu Hatası) olarak ayarlayın
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    // Hata durum kodunu yanıtta ayarlayın
    res.status(statusCode);
  
    // Hata yanıtını JSON formatında gönderin
    res.json({
      message: err.message,
      // Sadece geliştirme ortamında stack izlemesini gönder
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorHandler;
  