const bcrypt = require('bcrypt');
const ENUM = require('../config').ENUM;
const Roles = require('../features/role/model');
const Users = require('../features/user/model');
const Subeler = require('../features/sube/model');
const Firmalar = require('../features/firma/model');

exports.run = async () => {
  const superRoleData = {
    _id: ENUM.ROLE_SUPER_ADMIN_ID,
    name: ENUM.ROLE_SUPER_ADMIN_NAME,
    permissions: [ENUM.ROLE_SUPER_ADMIN_PERMISSION],
    documentinfo: {
      sube: ENUM.ROLE_SUPER_ADMIN_SUBE,
      is_active: false,
      is_archive: false,
      is_delete: false,
      created_by: ENUM.USER_SUPER_ADMIN_ID,
      created_at: null,
      updated_at: null,
      versionKey: 0
    }
  };
  const superUserData = {
    _id: ENUM.USER_SUPER_ADMIN_ID,
    tc: ENUM.USER_SUPER_ADMIN_TC,
    ad: ENUM.USER_SUPER_ADMIN_AD,
    soyad: ENUM.USER_SUPER_ADMIN_SOYAD,
    email: ENUM.USER_SUPER_ADMIN_EMAIL,
    password: bcrypt.hashSync(ENUM.USER_SUPER_ADMIN_PASSWORD, bcrypt.genSaltSync(8), null),
    tip: ENUM.USER_SUPER_ADMIN_TIP,
    roller: [ENUM.ROLE_SUPER_ADMIN_ID],
    documentinfo: {
      sube: ENUM.USER_SUPER_ADMIN_SUBE,
      is_active: true,
      is_archive: false,
      is_delete: false,
      created_by: ENUM.USER_SUPER_ADMIN_ID,
      created_at: null,
      updated_at: null,
      versionKey: 0
    }
  };
  const firmaGrifinData = {
    _id: ENUM.FIRMA_GRIFIN_ID,
    ad: ENUM.FIRMA_GRIFIN_AD,
    adres: {
      il: ENUM.FIRMA_GRIFIN_ADRES_IL,
      ilce: ENUM.FIRMA_GRIFIN_ADRES_ILCE,
      acikAdres: ENUM.FIRMA_GRIFIN_ADRES_ACIKADRES
    },
    iletisim: {
      gsm: ENUM.FIRMA_GRIFIN_ADRES_GSM,
      telefon: ENUM.FIRMA_GRIFIN_ADRES_TELEFON,
      eposta: ENUM.FIRMA_GRIFIN_ADRES_EPOSTA
    },
    documentinfo: {
      is_active: true,
      is_archive: false,
      is_delete: false,
      created_by: ENUM.USER_SUPER_ADMIN_ID,
      created_at: null,
      updated_at: null,
      versionKey: 0
    }
  };
  const subeGrifinData = {
    _id: ENUM.SUBE_GRIFIN_ID,
    firmaId: ENUM.FIRMA_GRIFIN_ID,
    ad: ENUM.SUBE_GRIFIN_AD,
    adres: {
      il: ENUM.SUBE_GRIFIN_ADRES_IL,
      ilce: ENUM.SUBE_GRIFIN_ADRES_ILCE,
      acikAdres: ENUM.SUBE_GRIFIN_ADRES_ACIKADRES
    },
    iletisim: {
      gsm: ENUM.SUBE_GRIFIN_ADRES_GSM,
      telefon: ENUM.SUBE_GRIFIN_ADRES_TELEFON,
      eposta: ENUM.SUBE_GRIFIN_ADRES_EPOSTA
    },
    documentinfo: {
      is_active: true,
      is_archive: false,
      is_delete: false,
      created_by: ENUM.USER_SUPER_ADMIN_ID,
      created_at: null,
      updated_at: null,
      versionKey: 0
    }
  };

  let superRole = await Roles.findOne({ _id: ENUM.ROLE_SUPER_ADMIN_ID });
  if (!superRole) {
    await Roles.create(superRoleData);
  }

  let superUser = await Users.findOne({ _id: ENUM.USER_SUPER_ADMIN_ID });
  if (!superUser) {
    await Users.create(superUserData);
  }

  let grifinSube = await Subeler.findOne({ _id: ENUM.SUBE_GRIFIN_ID });
  if (!grifinSube) {
    await Subeler.create(subeGrifinData);
  }

  let grifinFirma = await Firmalar.findOne({ _id: ENUM.FIRMA_GRIFIN_ID });
  if (!grifinFirma) {
    await Firmalar.create(firmaGrifinData);
  }
};
