const baseMessages = require('@base/messages');
const { name } = require('../admin');
module.exports.messages = {
  ...baseMessages(name),
  kullanicizatenvar: 'Girilen bilgilere sahip bir kullanıcı zaten mevcut',
  idkesik: 'Kullanıcı Id bilgisi eksik',
  dogrulamaHatasiAciklama: 'Eksik ya da yanlış bilgi girdiniz, lütfen girilen alanların doğruluğunu kontrol ediniz'
};
