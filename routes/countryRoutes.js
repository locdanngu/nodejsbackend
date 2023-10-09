const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();



module.exports = (sequelize) => {
  const Country = require("../models/Country")(sequelize);

  // Route GET /api/products
  router.get("/", async (req, res) => {
    try {
      const country = await Country.findAll({
      });

      res.json(country);
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });
  

  // Thêm các route khác cho sản phẩm ở đây

  return router;
};
