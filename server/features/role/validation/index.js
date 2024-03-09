const joi = require("joi");
const response = require("../../../lib/response");

const RolAyricaliklari = require("../../../lib/permissions");
const messages = require("../../user/messages");

const rolIzinleriListesi = RolAyricaliklari.privileges.map(
  (privilege) => privilege.key
);

class validation {
  constructor() {}
  static add = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi
            .string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Rol Adı Alanı Normal Metin Olmalıdır",
              "string.empty": "Rol Adı Alanı Boş Olamaz !",
              "string.min": `Rol Adı Alanı Ez Az ${3} Karakter Olmalıdır`,
              "string.max": "Rol Adı Alanı En Fazla 100 Karakterden Oluşabilir",
              "string.required": "Rol Adı Alanı Zorunludur",
            }),

          permissions: joi.array()
            .items(
              joi.string()
                .valid(...rolIzinleriListesi)
                .required()
            )
            .messages({
              "string.base": "İzin Anahtarı Normal Metin Olmalıdır",
              "any.required": "İzin Anahtarı Zorunludur",
              "any.only":
                "Geçersiz İzin Anahtarı, Girilen Anahtar İzinler Listesinde Bulunmalıdır",
            }),
        })
        .validateAsync(req.body);
    } catch (error) {
      return  response.error(res, messages.dogrulamaHatasiAciklama);
    }
    next();
  };
}

module.exports = validation;
