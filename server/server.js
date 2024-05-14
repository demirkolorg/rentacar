const dotenv = require("dotenv");
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

const express = require("express");
const cors = require("cors");
const app = express();
const configs = require("./config");
const chalk = require("chalk");
const log = console.log;
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const Super = require("./lib/super");
const path = require("path");
const routes = require("./routes");
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

configs.dbConfig.DbConfigInstall();
Super.super();

const _PREFIX = process.env.APP_PREFIX;
const _PORT = process.env.APP_PORT;

//!endpoints
app.use(_PREFIX, routes);

//!errorMiddleware
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

app.listen(_PORT, () =>
  log(
    "✅",
    chalk.bgGreen(`NodeJS Server ${_PORT} portundan çalışmaya başladı.`)
  )
);
