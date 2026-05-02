const { ok, fail, rows, first } = require("../utils/sqlHelpers");
const { createCrudController } = require("./crudFactory");
const { mapTaiKhoan } = require("./retailMappers");

const base = createCrudController({
  table: "TAIKHOAN",
  idColumn: "MATAIKHOAN",
  idParam: "maTK",
  columns: ["MATAIKHOAN", "USERNAME", "PASS", "QUYEN"],
  mapper: mapTaiKhoan,
  labels: { table: "tài khoản" },
  aliases: { MATAIKHOAN: "id", USERNAME: "username", PASS: "password", QUYEN: "role" },
});

const login = async (req, res) => {
  try {
    const username = req.body.username || req.body.USERNAME || req.query.username;
    const pass = req.body.pass || req.body.password || req.body.PASS || req.query.pass;
    if (!username || !pass) return fail(res, 400, "Thiếu username hoặc password");

    const user = await first(
      "SELECT TOP 1 MATAIKHOAN, USERNAME, PASS, QUYEN FROM TAIKHOAN WHERE USERNAME = @username AND PASS = @pass",
      { username, pass },
    );
    if (!user) return ok(res, null, "Sai tên đăng nhập hoặc mật khẩu");

    const mapped = mapTaiKhoan(user);
    delete mapped.PASS;
    delete mapped.password;
    ok(res, mapped, "Đăng nhập thành công");
  } catch (err) {
    fail(res, 500, "Lỗi đăng nhập", err.message);
  }
};

const getRole = async (req, res) => {
  try {
    const username = req.query.username || req.body.username;
    if (!username) return fail(res, 400, "Thiếu username");
    const data = await rows("SELECT TOP 1 USERNAME, QUYEN FROM TAIKHOAN WHERE USERNAME = @username", { username });
    ok(res, data[0] || null, "Lấy quyền thành công");
  } catch (err) {
    fail(res, 500, "Lỗi lấy quyền", err.message);
  }
};

module.exports = { ...base, login, getRole };
