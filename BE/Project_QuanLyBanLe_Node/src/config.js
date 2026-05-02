require("dotenv").config();

const bool = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") return fallback;
  return ["1", "true", "yes"].includes(String(value).toLowerCase());
};

module.exports = {
  port: Number(process.env.PORT || 7107),
  authDisabled: bool(process.env.AUTH_DISABLED, false),
  db: {
    server: process.env.DB_SERVER || "localhost\\SQLEXPRESS",
    database: process.env.DB_DATABASE || "QUANLYBANLE",
    driver: process.env.DB_DRIVER || "ODBC Driver 17 for SQL Server",
    user: process.env.DB_USER || undefined,
    password: process.env.DB_PASSWORD || undefined,
    trustedConnection: bool(process.env.DB_TRUSTED_CONNECTION, true),
    encrypt: bool(process.env.DB_ENCRYPT, false),
    trustServerCertificate: bool(process.env.DB_TRUST_SERVER_CERTIFICATE, true)
  },
  jwt: {
    key: process.env.JWT_KEY || "TicketQA_Secret_Key_1234567891011121314151617181920",
    issuer: process.env.JWT_ISSUER || "TicketQA",
    audience: process.env.JWT_AUDIENCE || "TicketQAUser",
    expiresInMinutes: Number(process.env.JWT_EXPIRES_IN_MINUTES || 60)
  }
};
