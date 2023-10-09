const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

module.exports = (sequelize) => {
  const Country = require("../models/Country")(sequelize);

  // Route GET /api/products
  router.get("/", async (req, res) => {
    const search = req.query.search;
    const id = req.query.id;

    try {
      let whereCondition = {}; // Điều kiện tìm kiếm mặc định là trống

      if (search) {
        whereCondition = {
          namecountry: {
            [Op.like]: `%${search}%`, // Tìm các thành phố có namecity chứa chuỗi `search`
          },
        };
      }

      if (id) {
        whereCondition.idcountry = id;
      }

      const country = await Country.findAll({
        where: whereCondition, // Sử dụng điều kiện tìm kiếm ở đây
      });

      res.json(country);
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });

  // Thêm các route khác cho sản phẩm ở đây
  router.post("/add", async (req, res) => {
    const namecountry = req.query.namecountry;

    if (!namecountry) {
      return res.status(400).json({ error: "Vui lòng cung cấp đủ thông tin." });
    }

    try {
      const newCountry = await Country.create({
        namecountry: namecountry,
      });

      res.status(201).json({ success: "Thêm quốc gia thành công" });
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });

  router.patch("/change", async (req, res) => {
    const id = req.query.id;

    if (!namecountry) {
      return res.status(400).json({ error: "Vui lòng cung cấp đủ thông tin." });
    }

    try {
      const existingCountry = await Country.findOne({
        where: { idcountry: id },
      });

      if (!existingCountry) {
        return res
          .status(404)
          .json({ error: "Quốc gia không tồn tại trong hệ thống." });
      }

      // Chỉnh sửa thông tin thành phố
      existingCountry.namecountry = namecountry;

      // Lưu thông tin chỉnh sửa vào cơ sở dữ liệu
      await existingCountry.save();

      res.json({ success: "Chỉnh sửa quốc gia thành công" });
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });

  return router;
};
