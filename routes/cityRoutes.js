const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

module.exports = (sequelize) => {
  const City = require("../models/City")(sequelize);
  const Country = require("../models/Country")(sequelize);

  // Route GET /api/products
  router.get("/", async (req, res) => {
    const search = req.query.search;
    const id = req.query.id;
  
    try {
      let whereCondition = {}; // Điều kiện tìm kiếm mặc định là trống
  
      if (search) {
        whereCondition = {
          namecity: {
            [Op.like]: `%${search}%` // Tìm các thành phố có namecity chứa chuỗi `search`
          }
        };
      }

      if (id) {
        whereCondition.idcity = id;
      }
  
      const cities = await City.findAll({
        where: whereCondition, // Sử dụng điều kiện tìm kiếm ở đây
        include: [
          {
            model: Country,
            attributes: ["namecountry"]
          }
        ],
        attributes: ["idcity", "namecity", "imagecity"]
      });
  
      res.json(cities);
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });

  router.post("/add", async (req, res) => {
    const namecity = req.query.namecity;
    const imagecity = req.query.imagecity;
    const idcountry = req.query.idcountry;

    if (!namecity || !imagecity || !idcountry) {
      return res.status(400).json({ error: "Vui lòng cung cấp đủ thông tin." });
    }

    try {
      const country = await Country.findOne({
        where: { idcountry },
      });

      if (!country) {
        return res
          .status(404)
          .json({ error: "Quốc gia không tồn tại trong hệ thống." });
      }

      const newCity = await City.create({
        namecity: namecity,
        imagecity: imagecity,
        idcountry: idcountry,
      });

      res.status(201).json({ success: "Thêm thành phố thành công" });
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });

  // Thêm các route khác cho sản phẩm ở đây

  return router;
};
