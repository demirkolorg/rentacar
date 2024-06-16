const fs = require('fs');
const path = require('path');
const ENUM = require('../config').ENUM;

function loadKeys(directory) {
  const keys = [];
  const subdirectories = fs.readdirSync(directory);

  subdirectories.forEach(subdirectory => {
    const subdirectoryPath = path.join(directory, subdirectory);
    const stats = fs.statSync(subdirectoryPath);

    if (stats.isDirectory()) {
      const keyFilePath = path.join(subdirectoryPath, 'key', 'index.js');
      if (fs.existsSync(keyFilePath)) {
        const keyModule = require(keyFilePath);
        if (Array.isArray(keyModule)) {
          keys.push(...keyModule);
        } else {
          keys.push(keyModule);
        }
      }
    }
  });

  return keys;
}

// @features klasöründeki tüm key/index.js dosyalarını yükleyin
const featuresPath = path.join(__dirname, '../features');
const featureKeys = loadKeys(featuresPath);

module.exports = [
  ...featureKeys,
  {
    key: ENUM.ROLE_SUPER_ADMIN_PERMISSION,
    name: 'SUPER ADMIN FULL',
    group: 'ADMIN',
    description: 'Tüm endpointlere full yetkilidir'
  }
];
