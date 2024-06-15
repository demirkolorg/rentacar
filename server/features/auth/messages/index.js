const baseMessages = require('@base/messages');

const name = 'Auth';

const messages = {
  ...baseMessages(name),

  getUserRolesByUserId: 'Kullanıcın rolleri başarıyla getirildi.',
  getUserPermissionsByUserId: 'Kullanıcın izinleri başarıyla getirildi.',
  getUserRolesAndPermissionsByUserId: 'Kullanıcın rolleri ve izinleri başarıyla getirildi.',
  rollerYok: 'Eklenmek istenen rol bulunamadı',
  kullaniciYok: 'İstenilen Kullanıcı Bulunamadı',
  VALIDATE_FIELD_BEFORE_AUTH: 'Email yada şifre hatalı.',
  AUTH_SUCCESSFUL_TITLE: 'Kimlik Doğrulama Başarılı',
  AUTH_SUCCESSFUL_DESC: 'Kimlik Doğrulama işlemi başarılı bir şekilde gerçekleştirildi.',
  UNAUTHORIZED_ACCESS_TITLE: 'Yetkisiz Erişim',
  UNAUTHORIZED_ACCESS_DESC: 'Bu işlemi gerçekleştirmeye yetkili değilsiniz, sistem yöneticisine başvurunuz.'
};

module.exports = messages;
