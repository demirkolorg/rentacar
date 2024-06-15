const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const configs = require('@config');
const { formatDate } = require('@lib/fonksiyonlar');
const auth = require('@middlewares/auth');
const { UploadRoute } = require('@lib/defineRoute');
const controller = require('../controller');
const role = require('../key');

const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Dosya formatı desteklenmiyor!');
  }
};
const documentFilter = (req, file, cb) => {
  const filetypes = /doc|docx|xls|xlsx|json/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Dosya formatı desteklenmiyor!');
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      cb(null, configs.envConfig.FILE_UPLOAD_PATH + 'images/');
    } else if (file.mimetype === 'application/json') {
      cb(null, configs.envConfig.FILE_UPLOAD_PATH + 'document/');
    } else {
      cb(null, configs.envConfig.FILE_UPLOAD_PATH + 'others/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, formatDate() + '-' + file.originalname);
  }
});

const imageUpload = multer({ storage: storage, fileFilter: imageFilter });
const documentUpload = multer({ storage: storage, fileFilter: documentFilter });
const otherUpload = multer({ storage: storage });

UploadRoute(router, auth, 'post', '/image', controller.image, imageUpload.single('file'));
UploadRoute(router, auth, 'post', '/document', controller.document, documentUpload.single('file'));
UploadRoute(router, auth, 'post', '/other', controller.other, otherUpload.single('file'));

module.exports = router;
