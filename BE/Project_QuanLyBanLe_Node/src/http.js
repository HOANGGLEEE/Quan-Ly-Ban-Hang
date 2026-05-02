function trimStrings(row) {
  if (!row || typeof row !== "object") return row;
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value
    ])
  );
}

function trimRows(rows) {
  return (rows || []).map(trimStrings);
}

function ok(res, payload) {
  return res.json(payload);
}

function fail(res, error) {
  return res.status(500).json({ success: false, message: "Loi: " + error.message });
}

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

function firstValue(row) {
  if (!row) return undefined;
  return row[Object.keys(row)[0]];
}

module.exports = { asyncHandler, fail, firstValue, ok, trimRows, trimStrings };
