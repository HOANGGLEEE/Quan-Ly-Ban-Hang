const { signAccount } = require("../auth");
const repo = require("../repositories");
const { trimRows } = require("../http");

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

const login = async (req, res) => {
  try {
    const username = req.query.username ?? req.body.username ?? req.body.USERNAME;
    const pass = req.query.pass ?? req.body.pass ?? req.body.PASS;

    if (!hasText(username) || !hasText(pass)) {
      return res.json({ success: false, message: "Thieu username hoac password!" });
    }

    const rows = await repo.taiKhoan.login(username, pass);
    if (!rows.length) {
      return res.json({ success: false, message: "Sai ten dang nhap hoac mat khau!" });
    }

    const user = trimRows(rows)[0];
    return res.json({
      success: true,
      message: "Dang nhap thanh cong!",
      token: signAccount(user),
      data: {
        MaTaiKhoan: user.MATAIKHOAN,
        UserName: user.USERNAME,
        Quyen: user.QUYEN
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getRole = async (req, res) => {
  try {
    const { username } = req.query;

    if (!hasText(username)) {
      return res.json({ success: false, message: "Thieu ten dang nhap!" });
    }

    const quyen = await repo.taiKhoan.role(username);
    if (!quyen) {
      return res.json({
        success: false,
        message: "Khong tim thay tai khoan hoac chua duoc cap quyen!"
      });
    }

    return res.json({
      success: true,
      message: "Lay quyen thanh cong!",
      data: { UserName: username.trim(), Quyen: quyen }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

module.exports = { login, getRole };
