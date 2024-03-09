//dış
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
//kök
const response = require("../../../lib/response");
const Enum = require("../../../config/enum.config");
//iç
const messages = require("../messages");
const Roles = require("../model");

exports.add = async (req, res) => {
  let body = req.body;
  try {
    let createdRole = await Roles.create({
      name: body.name,
      permissions: body.permissions,
      is_active: body.is_active,
    });

   
    return response.success(
      res,
      createdRole,
      req.user?.email,
      pt.points.users,
      pt.types.list,
      messages.basarili,
      messages.create_basarili
    );

  } catch (err) {
    return response.error(res);
  }
};
