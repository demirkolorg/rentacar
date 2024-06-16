const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../features'); // Modellerin bulunduğu dizin

function autoImportModels() {
  const models = {};

  fs.readdirSync(modelsDir).forEach(folder => {
    const modelPath = path.join(modelsDir, folder, 'model', 'index.js');

    if (fs.existsSync(modelPath)) {
      const model = require(modelPath);
      models[folder] = model.pointname;
    }
  });

  return models;
}
module.exports = autoImportModels();
