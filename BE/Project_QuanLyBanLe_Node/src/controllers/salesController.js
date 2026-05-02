const repo = require("../repositories");
const { trimRows } = require("../http");

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getValue(req, name) {
  return req.query[name] ?? req.body?.[name];
}

const updateProductQuantity = async (req, res) => {
  try {
    const maSP = getValue(req, "maSP") || getValue(req, "MASP");
    const soLuongMoi = toNumber(getValue(req, "soLuongMoi") || getValue(req, "SOLUONGTON"), NaN);

    if (!hasText(maSP) || !Number.isFinite(soLuongMoi)) {
      return res.status(400).json({ success: false, message: "Thieu ma san pham hoac so luong moi" });
    }

    const rows = await repo.sanPham.updateQuantity(maSP, soLuongMoi);
    return rows ? res.send("Cap nhat so luong thanh cong") : res.status(400).send("Cap nhat that bai");
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const insertPayment = async (req, res) => {
  try {
    const model = req.body || {};

    if (!hasText(model.MaThanhToan)) {
      return res.status(400).json({ success: false, message: "Thieu ma thanh toan" });
    }

    if ((await repo.thanhToan.byId(model.MaThanhToan)).length === 1) {
      return res.json({ success: false, message: "Da ton tai thanh toan co ma nay" });
    }

    await repo.thanhToan.create(model);
    return res.json({ success: true, message: "Them thong tin thanh toan thanh cong" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const insertCustomer = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Du lieu gui len rong." });
    }

    await repo.khachHang.create(req.body);
    return res.json({ success: true, message: "Them khach hang thanh cong!" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Loi khi them khach hang: " + err.message
    });
  }
};

const insertSalesInvoice = async (req, res) => {
  try {
    const model = req.body || {};

    if (!hasText(model.MAHDBAN) || (await repo.hoaDonBan.exists(model.MAHDBAN))) {
      return res.json({
        success: false,
        message: "Khong the them hoa don (da ton tai hoac loi khac)."
      });
    }

    await repo.hoaDonBan.create(model);
    return res.json({ success: true, message: "Them hoa don thanh cong!" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Loi khi them hoa don: " + err.message
    });
  }
};

const getAllSalesInvoices = async (req, res) => {
  try {
    return res.json(trimRows(await repo.hoaDonBan.all()));
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getSalesInvoiceById = async (req, res) => {
  try {
    const rows = trimRows(await repo.hoaDonBan.byId(req.query.maHoaDon));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay hoa don.");
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getAllSaleDetails = async (req, res) => {
  try {
    return res.json(trimRows(await repo.chiTietBan.all()));
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getSaleDetailsByInvoice = async (req, res) => {
  try {
    const rows = trimRows(await repo.chiTietBan.byHoaDon(req.query.maHDB));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay chi tiet cua hoa don.");
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "Lay danh sach khach thanh cong",
      data: trimRows(await repo.khachHang.all())
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const maKH = req.query.maKH || req.query.makh;
    if (!hasText(maKH)) {
      return res.status(400).json({ success: false, message: "Thieu ma khach hang." });
    }

    const rows = trimRows(await repo.khachHang.byId(maKH));
    if (!rows.length) {
      return res.status(404).json({ success: false, message: "Khong tim thay khach hang." });
    }

    return res.json({
      success: true,
      message: "Lay thong tin khach hang thanh cong!",
      data: rows.length === 1 ? rows[0] : rows
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Loi khi lay thong tin khach hang: " + err.message
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const rows = trimRows(await repo.danhMuc.all());
    return rows.length ? res.json(rows) : res.status(204).end();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const rows = trimRows(await repo.danhMuc.byId(req.query.madanhmuc));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay danh muc.");
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    return res.json(trimRows(await repo.sanPham.all()));
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const rows = trimRows(await repo.sanPham.byId(req.query.id));
    return rows.length ? res.json(rows) : res.status(404).send("Khong tim thay san pham.");
  } catch (err) {
    return res.status(500).json({ success: false, message: "Loi: " + err.message });
  }
};

module.exports = {
  updateProductQuantity,
  insertPayment,
  insertCustomer,
  insertSalesInvoice,
  getAllSalesInvoices,
  getSalesInvoiceById,
  getAllSaleDetails,
  getSaleDetailsByInvoice,
  getAllCustomers,
  getCustomerById,
  getAllCategories,
  getCategoryById,
  getAllProducts,
  getProductById
};
