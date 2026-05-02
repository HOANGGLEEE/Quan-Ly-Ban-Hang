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

if (process.env.DB_PORT) {
  config.port = Number(process.env.DB_PORT);
} else if (instanceName) {
  config.options.instanceName = instanceName;
}

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("DB Error:", err.message);
    throw err;
  }
};

module.exports = { sql, connectDB };
