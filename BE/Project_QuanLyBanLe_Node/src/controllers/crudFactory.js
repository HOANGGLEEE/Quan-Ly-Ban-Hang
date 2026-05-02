const { ok, fail, rows, execute, parseBody } = require("../utils/sqlHelpers");

const mapList = (list, mapper) => (mapper ? list.map(mapper) : list);

const createCrudController = (config) => {
  const {
    table,
    idColumn,
    idParam,
    columns,
    select,
    mapper,
    labels,
    aliases = {},
  } = config;

  const tableLabel = labels?.table || table;
  const getId = (req) => req.query[idParam] || req.query.id || req.params.id;

  const getAll = async (_req, res) => {
    try {
      const query = select || `SELECT ${columns.join(", ")} FROM ${table}`;
      ok(res, mapList(await rows(query), mapper), `Lấy danh sách ${tableLabel} thành công`);
    } catch (err) {
      fail(res, 500, `Lỗi lấy danh sách ${tableLabel}`, err.message);
    }
  };

  const getById = async (req, res) => {
    try {
      const id = getId(req);
      if (!id) return fail(res, 400, `Thiếu ${idParam}`);

      const query = select
        ? `SELECT * FROM (${select}) AS q WHERE q.${idColumn} = @id`
        : `SELECT ${columns.join(", ")} FROM ${table} WHERE ${idColumn} = @id`;
      const data = await rows(query, { id });
      if (!data.length) return fail(res, 404, `Không tìm thấy ${tableLabel}`);
      ok(res, mapList(data, mapper), `Lấy ${tableLabel} thành công`);
    } catch (err) {
      fail(res, 500, `Lỗi lấy ${tableLabel}`, err.message);
    }
  };

  const create = async (req, res) => {
    try {
      const body = parseBody(req, aliases);
      const fields = columns.filter((col) => body[col] !== undefined);
      if (!fields.includes(idColumn)) fields.unshift(idColumn);
      if (!body[idColumn]) return fail(res, 400, `Thiếu ${idColumn}`);

      const query = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${fields
        .map((field) => `@${field}`)
        .join(", ")})`;
      const affected = await execute(
        query,
        Object.fromEntries(fields.map((field) => [field, body[field]])),
      );
      ok(res, { affected }, `Thêm ${tableLabel} thành công`);
    } catch (err) {
      fail(res, 500, `Lỗi thêm ${tableLabel}`, err.message);
    }
  };

  const update = async (req, res) => {
    try {
      const body = parseBody(req, aliases);
      const id = body[idColumn] || getId(req);
      if (!id) return fail(res, 400, `Thiếu ${idColumn}`);

      const fields = columns.filter((col) => col !== idColumn && body[col] !== undefined);
      if (!fields.length) return fail(res, 400, "Không có dữ liệu cập nhật");

      const query = `UPDATE ${table} SET ${fields
        .map((field) => `${field} = @${field}`)
        .join(", ")} WHERE ${idColumn} = @id`;
      const affected = await execute(query, {
        id,
        ...Object.fromEntries(fields.map((field) => [field, body[field]])),
      });
      ok(res, { affected }, `Cập nhật ${tableLabel} thành công`);
    } catch (err) {
      fail(res, 500, `Lỗi cập nhật ${tableLabel}`, err.message);
    }
  };

  const remove = async (req, res) => {
    try {
      const id = getId(req);
      if (!id) return fail(res, 400, `Thiếu ${idParam}`);

      const affected = await execute(`DELETE FROM ${table} WHERE ${idColumn} = @id`, { id });
      ok(res, { affected }, `Xóa ${tableLabel} thành công`);
    } catch (err) {
      fail(res, 500, `Lỗi xóa ${tableLabel}`, err.message);
    }
  };

  return { getAll, getById, create, update, remove };
};

module.exports = { createCrudController };
