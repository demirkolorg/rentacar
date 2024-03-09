const chalk = require("chalk");
const log = console.log;
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

exports.DbConfigInstall = () => {
  mongoose
    .connect(uri)
    .then(() => log("✅", chalk.bgGreen("MongoDB'ye başarıyla bağlandı.")))
    .catch((err) => log(chalk.bgRed("MongoDB bağlantı hatası:", err)));
};
