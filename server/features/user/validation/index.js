const joi = require("joi");
const response = require("../../../lib/response");
const messages = require("../messages");

class validation {
  constructor() {}
  static add = async (req, res, next) => {
    try {
      await joi
        .object({
          tc: joi
            .string()
            .pattern(/^[0-9]+$/, { name: "numbers" })
            .min(11)
            .max(11)
            .required()
            .messages({
              "string.pattern.name": "tc Alanı Sayısal Değer Olmalıdır",
              "string.empty": "tc Alanı Boş Olamaz !",
              "string.min": "tc Alanı Ez Az 11 Karakter Olmalıdır",
              "string.max": "tc Alanı En Fazla 11 Karakterden Oluşabilir",
              "any.required": "tc Alanı Zorunludur",
            }),
          ad: joi
            .string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Ad Alanı Normal Metin Olmalıdır",
              "string.empty": "Ad Alanı Boş Olamaz !",
              "string.min": `Ad Alanı Ez Az ${3} Karakter Olmalıdır`,
              "string.max": "Ad Alanı En Fazla 100 Karakterden Oluşabilir",
              "string.required": "Ad Alanı Zorunludur",
            }),
          soyad: joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Soyad Alanı Normal Metin Olmalıdır",
            "string.empty": "Soyad Alanı Boş Olamaz !",
            "string.min": "Soyad Alanı Ez Az 3 Karakter Olmalıdır",
            "string.max": "Soyad Alanı En Fazla 100 Karakterden Oluşabilir",
            "string.required": "Soyad Alanı Zorunludur",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Email Alanı Normal Metin Olmalıdır",
              "string.empty": "Email Alanı Boş Olamaz !",
              "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
              "string.email": "Lütfen Geçerli Bir Email Giriniz",
              "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
              "string.required": "Email Alanı Zorunludur",
            }),
          password: joi
            .string()
            .trim()
            .min(6)
            .max(36)
            .required()
            .messages({
              "string.base": "Şifre Alanı Normal Metin Olmalıdır",
              "string.empty": "Şifre Alanı Boş Olamaz !",
              "string.min": `Şifre Alanı Ez Az ${66} Karakter Olmalıdır`,
              "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşabilir",
              "string.required": "Şifre Alanı Zorunludur",
            }),
          roller: joi.array().items(
            joi
              .string()
              .regex(/^[0-9a-fA-F]{24}$/)
              .required()
              .messages({
                "string.pattern.base":
                  "Her bir rol geçerli bir ObjectId olmalıdır (24 karakter uzunluğunda hexadecimal).",
                "string.empty": "Rol alanı boş bırakılamaz.",
                "any.required": "Rol ID'si zorunludur.",
              })
          ),
        })
        .validateAsync(req.body);
    } catch (error) {
      return response.error(res, error.message, messages.dogrulamaHatasiBaslik);
    }
    next();
  };
  static update = async (req, res, next) => {
    try {
      await joi
        .object({
          tc: joi
            .string()
            .pattern(/^[0-9]+$/, { name: "numbers" })
            .min(11)
            .max(11)
            .messages({
              "string.pattern.name": "tc Alanı Sayısal Değer Olmalıdır",
              "string.min": "tc Alanı Ez Az 11 Karakter Olmalıdır",
              "string.max": "tc Alanı En Fazla 11 Karakterden Oluşabilir",
            }),
          ad: joi
            .string()
            .trim()
            .min(3)
            .max(100)
            .messages({
              "string.base": "Ad Alanı Normal Metin Olmalıdır",
              "string.min": `Ad Alanı Ez Az ${3} Karakter Olmalıdır`,
              "string.max": "Ad Alanı En Fazla 100 Karakterden Oluşabilir",
            }),
          soyad: joi.string().trim().min(3).max(100).messages({
            "string.base": "Soyad Alanı Normal Metin Olmalıdır",
            "string.min": "Soyad Alanı Ez Az 3 Karakter Olmalıdır",
            "string.max": "Soyad Alanı En Fazla 100 Karakterden Oluşabilir",
          }),
          email: joi.string().email().trim().min(3).max(100).messages({
            "string.base": "Email Alanı Normal Metin Olmalıdır",
            "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
            "string.email": "Lütfen Geçerli Bir Email Giriniz",
            "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
          }),
          password: joi
            .string()
            .trim()
            .min(6)
            .max(36)
            .messages({
              "string.base": "Şifre Alanı Normal Metin Olmalıdır",
              "string.min": `Şifre Alanı Ez Az ${66} Karakter Olmalıdır`,
              "string.max": "Şifre Alanı En Fazla 36 Karakterden Oluşabilir",
            }),
          roller: joi.array().items(
            joi
              .string()
              .regex(/^[0-9a-fA-F]{24}$/)
              .messages({
                "string.pattern.base":
                  "Her bir rol geçerli bir ObjectId olmalıdır (24 karakter uzunluğunda hexadecimal).",
              })
          ),
        })
        .validateAsync(req.body);
    } catch (error) {
      return response.error(res, error.message, messages.dogrulamaHatasiBaslik);
    }
    next();
  };
  static delete = async (req, res, next) => {
    try {
      await joi
        .object({
          tc: joi
            .string()
            .pattern(/^[0-9]+$/, { name: "numbers" })
            .min(11)
            .max(11)
            .messages({
              "string.pattern.name": "tc Alanı Sayısal Değer Olmalıdır",
              "string.min": "tc Alanı Ez Az 11 Karakter Olmalıdır",
              "string.max": "tc Alanı En Fazla 11 Karakterden Oluşabilir",
            }),
        
          email: joi.string().email().trim().min(3).max(100).messages({
            "string.base": "Email Alanı Normal Metin Olmalıdır",
            "string.min": "Email Alanı Ez Az 3 Karakter Olmalıdır",
            "string.email": "Lütfen Geçerli Bir Email Giriniz",
            "string.max": "Email Alanı En Fazla 100 Karakterden Oluşabilir",
          }),
       
        })
        .validateAsync(req.body);
    } catch (error) {
      return response.error(res, error.message, messages.dogrulamaHatasiBaslik);
    }
    next();
  };
}

module.exports = validation;
