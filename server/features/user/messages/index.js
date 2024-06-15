const baseMessages = require('@base/messages');

const name = 'Kullanıcı';

const messages = {
  ...baseMessages(name),
  kullanicizatenvar: 'Girilen bilgilere sahip bir kullanıcı zaten mevcut',
  dogrulamaHatasiAciklama: 'Eksik ya da yanlış bilgi girdiniz, lütfen girilen alanların doğruluğunu kontrol ediniz',
  idkesik: 'Kullanıcı Id bilgisi eksik'
};

module.exports = messages;
