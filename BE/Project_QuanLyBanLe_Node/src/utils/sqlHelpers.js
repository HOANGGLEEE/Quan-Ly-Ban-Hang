const { sql } = require("../config/db");

const ok = (res, data, message = "Thành công") =>
  res.json({ success: true, message, data });

const fail = (res, status, message, detail) =>
  res.status(status).json({ success: false, message, detail });

const run = async (query, params = {}) => {
  const request = new sql.Request();
  Object.entries(params).forEach(([key, value]) => {
    request.input(key, value === undefined ? null : value);
  });
  return request.query(query);
};

const rows = async (query, params = {}) => {
  const result = await run(query, params);
  return result.recordset || [];
};

const first = async (query, params = {}) => {
  const list = await rows(query, params);
  return list[0] || null;
};

const execute = async (query, params = {}) => {
  const result = await run(query, params);
  return result.rowsAffected?.[0] || 0;
};

const parseBody = (req, aliases = {}) => {
  const source = { ...req.query, ...req.body };
  return new Proxy(source, {
    get(target, prop) {
      if (target[prop] !== undefined) return target[prop];
      const alias = aliases[prop];
      if (alias && target[alias] !== undefined) return target[alias];
      return undefined;
    },
  });
};

module.exports = { sql, ok, fail, rows, first, execute, parseBody };
