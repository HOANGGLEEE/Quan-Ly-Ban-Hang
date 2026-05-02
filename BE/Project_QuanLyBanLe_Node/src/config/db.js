const sql = require("mssql/msnodesqlv8");
const config = require("../config");

let poolPromise;

function yesNo(value) {
  return value ? "yes" : "no";
}

function getConnectionConfig() {
  const common = [
    `Driver={${config.db.driver}}`,
    `Server=${config.db.server}`,
    `Database=${config.db.database}`,
    `Encrypt=${yesNo(config.db.encrypt)}`,
    `TrustServerCertificate=${yesNo(config.db.trustServerCertificate)}`
  ];

  if (config.db.trustedConnection) {
    common.push("Trusted_Connection=Yes");
  } else {
    common.push(`UID=${config.db.user || ""}`);
    common.push(`PWD=${config.db.password || ""}`);
  }

  return {
    driver: "msnodesqlv8",
    connectionString: common.join(";") + ";"
  };
}

async function connectDB() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(getConnectionConfig()).connect();
  }

  return poolPromise;
}

async function getPool() {
  return connectDB();
}

function addParams(request, params = {}) {
  Object.entries(params).forEach(([key, value]) => {
    request.input(key.replace(/^@/, ""), value);
  });
  return request;
}

async function query(text, params) {
  const request = (await getPool()).request();
  const result = await addParams(request, params).query(text);
  return result.recordset || [];
}

async function execute(text, params) {
  const request = (await getPool()).request();
  const result = await addParams(request, params).query(text);
  return result.rowsAffected?.reduce((sum, n) => sum + n, 0) || 0;
}

async function proc(name, params) {
  const request = (await getPool()).request();
  const result = await addParams(request, params).execute(name);
  return result.recordset || [];
}

module.exports = {
  sql,
  connectDB,
  getPool,
  query,
  execute,
  proc
};
