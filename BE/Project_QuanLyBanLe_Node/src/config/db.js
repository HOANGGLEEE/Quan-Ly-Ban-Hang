const sql = require("mssql");
require("dotenv").config();

const toBool = (value, fallback) => {
  if (value === undefined || value === "") return fallback;
  return ["1", "true", "yes"].includes(String(value).toLowerCase());
};

const parseServer = () => {
  const configuredServer = process.env.DB_SERVER || "localhost\\SQLEXPRESS";
  const [server, instanceName] = configuredServer.split("\\");
  return {
    server,
    instanceName: process.env.DB_INSTANCE || instanceName,
  };
};

const { server, instanceName } = parseServer();
const configuredPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined;

if (configuredPort !== undefined && !Number.isInteger(configuredPort)) {
  throw new Error(`DB_PORT is invalid: ${process.env.DB_PORT}`);
}

const config = {
  server,
  database: process.env.DB_DATABASE || "QUANLYBANLE",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "123",
  options: {
    encrypt: toBool(process.env.DB_ENCRYPT, false),
    trustServerCertificate: toBool(process.env.DB_TRUST_SERVER_CERTIFICATE, true),
    enableArithAbort: true,
  },
};

if (configuredPort) {
  config.port = configuredPort;
} else if (instanceName) {
  config.options.instanceName = instanceName;
}

const getConnectionTarget = () => {
  if (config.port) return `${config.server}:${config.port}`;
  if (config.options.instanceName) return `${config.server}\\${config.options.instanceName}`;
  return config.server;
};

const getConnectionHint = () => {
  const target = getConnectionTarget();

  if (config.port) {
    return [
      `Cannot connect to SQL Server at ${target}.`,
      "Check that SQL Server (SQLEXPRESS) is running and that DB_PORT in .env matches the TCP port shown in SQL Server Configuration Manager.",
    ].join(" ");
  }

  return [
    `Cannot connect to SQL Server at ${target}.`,
    "Check that SQL Server (SQLEXPRESS) and SQL Server Browser are running, or set DB_PORT in .env to the SQL Server TCP port.",
  ].join(" ");
};

const connectDB = async () => {
  try {
    console.log(`Connecting to DB at ${getConnectionTarget()}...`);
    await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("DB Error:", err.message);
    if (err.code === "ESOCKET") {
      console.error("DB Hint:", getConnectionHint());
    }
    throw err;
  }
};

module.exports = { sql, connectDB };
