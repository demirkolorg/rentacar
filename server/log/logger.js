const { format, createLogger, transports } = require("winston");
const { LOG_LEVELS } = require("../config/enum.config");

const formats = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  format.simple(),
  format.splat(),
  format.printf(
    (info) =>
      `${info.timestamp} ${info.level.toUpperCase()} [user_id:${
        info.message.user_id
      }] [location:${info.message.location}] [procType:${
        info.message.proc_type
      }] [log:${info.message.log}]`
  )
);

const logger = createLogger({
  level: LOG_LEVELS,
  transports: [new transports.Console({ format: formats })],
});

module.exports = logger;
