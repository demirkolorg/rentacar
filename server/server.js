require('module-alias/register');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });
const express = require('express');
const app = express();
const DB = require('./config').DB;
const errorMiddleware = require('@middlewares/error');
const SUPER = require('@helper/super');
const routes = require('@routes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

DB.run();
(async () => {
  await SUPER.run();
})();
const _PREFIX = process.env.APP_PREFIX;
const _PORT = process.env.APP_PORT;

app.use(_PREFIX, routes);
app.use(errorMiddleware);

//! Deployment config
// const path = require("path");
// __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(_PORT, () => console.log('✅', chalk.bgGreen(`NodeJS Server ${_PORT} portundan çalışmaya başladı.`)));
