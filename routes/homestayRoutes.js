const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();



module.exports = (sequelize) => {
  const City = require("../models/City")(sequelize);
  const Homestay = require("../models/Homestay")(sequelize);

  // Route GET /api/products
  router.get("/", async (req, res) => {
    try {
      const homestay = await Homestay.findAll({
        include: [{ model: City, attributes: ['namecity'] }], // Kết hợp với mô hình Country để lấy tên quốc gia
        attributes: ['idhomestay','namehotel','address','price'], // Chọn thuộc tính namecity từ bảng city
      });

      res.json(homestay);
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });
  

  // Thêm các route khác cho sản phẩm ở đây

  return router;
};
