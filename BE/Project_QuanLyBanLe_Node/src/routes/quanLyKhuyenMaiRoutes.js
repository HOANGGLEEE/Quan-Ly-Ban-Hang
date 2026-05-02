const express = require("express");
const c = require("../controllers/quanLyKhuyenMaiController");

const router = express.Router();
router.get("/get-all-khuyenmai", c.getAll);
router.get("/get-byid-khuyenmai", c.getById);
router.post("/create-khuyenmai", c.create);
router.post("/update-khuyenmai", c.update);
router.put("/update-khuyenmai", c.update);
router.delete("/del-khuyenmai", c.remove);

module.exports = router;
