const { createCrudController } = require("./crudFactory");
const { ok, fail, execute, first } = require("../utils/sqlHelpers");
const { mapDanhMuc } = require("./retailMappers");

const base = createCrudController({
  table: "DANHMUC",
  idColumn: "MADANHMUC",
  idParam: "madanhmuc",
  columns: ["MADANHMUC", "TENDANHMUC", "MOTA"],
  mapper: mapDanhMuc,
  labels: { table: "danh mục" },
  aliases: { MADANHMUC: "id", TENDANHMUC: "name", MOTA: "description" },
});

const remove = async (req, res) => {
  try {
    const id = req.query.madanhmuc || req.query.id || req.params.id;
    if (!id) return fail(res, 400, "Thiếu madanhmuc");

    const linkedProduct = await first("SELECT TOP 1 MASP FROM SANPHAM WHERE MADANHMUC = @id", { id });
    if (linkedProduct) return fail(res, 400, "Không thể xóa danh mục đang có sản phẩm");

    const affected = await execute("DELETE FROM DANHMUC WHERE MADANHMUC = @id", { id });
    ok(res, { affected }, "Xóa danh mục thành công");
  } catch (err) {
    fail(res, 500, "Lỗi xóa danh mục", err.message);
  }
};

module.exports = { ...base, remove };
