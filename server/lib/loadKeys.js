const fs = require('fs');
const path = require('path');

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

module.exports = loadKeys;
