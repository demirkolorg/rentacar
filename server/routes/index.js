const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// features dizininin yolunu belirle
const featuresDir = path.join(__dirname, '../features');
// features dizinindeki her bir klasörü oku
fs.readdirSync(featuresDir).forEach(folder => {
  // Klasördeki routes/index.js dosyasının yolunu belirle
  const routesPath = path.join(featuresDir, folder, 'routes', 'index.js');
  // routes/index.js dosyasının var olup olmadığını kontrol et
  if (fs.existsSync(routesPath)) {
    // routes/index.js dosyasını içe aktar
    const route = require(routesPath);
    // İçe aktarılan route'u ilgili URL yoluna ekle
    router.use(`/${folder}`, route);
  }
});

module.exports = router;
