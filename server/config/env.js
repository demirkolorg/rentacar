module.exports = {
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  CONNECTION_STRING: process.env.CONNECTION_STRING,
  JWT: {
    sistemSECRET: 'GrifinRental2024_',
    SECRET: 'rentacar_2024',

    
    EXPIRE_TIME: !isNaN(parseInt(process.env.TOKEN_EXPIRE_TIME)) ? parseInt(process.env.TOKEN_EXPIRE_TIME) : 60 * 60 * 24 //68400
  },
  FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
  DEFAULT_LANG: process.env.DEFAULT_LANG
};
