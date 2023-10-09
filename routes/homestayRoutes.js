const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();



module.exports = (sequelize) => {
  const City = require("../models/City")(sequelize);
  const Homestay = require("../models/Homestay")(sequelize);

  // Route GET /api/products
  router.get("/", async (req, res) => {
    const search = req.query.search;
    const id = req.query.id;

    try {
      let whereCondition = {}; // Điều kiện tìm kiếm mặc định là trống

      if (search) {
        whereCondition = {
          namehotel: {
            [Op.like]: `%${search}%`, // Tìm các thành phố có namecity chứa chuỗi `search`
          },
        };
      }

      if (id) {
        whereCondition.idhomestay = id;
      }

      const homestay = await Homestay.findAll({
        where: whereCondition,
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
  router.post("/add", async (req, res) => {
    const namehotel = req.query.namehotel;
    const address = req.query.address;
    const price = req.query.price;
    const idcity = req.query.idcity;

    if (!namehotel || !address || !price || !idcity) {
      return res.status(400).json({ error: "Vui lòng cung cấp đủ thông tin." });
    }

    try {
      const city = await City.findOne({
        where: { idcity },
      });

      if (!city) {
        return res
          .status(404)
          .json({ error: "Thành phố không tồn tại trong hệ thống." });
      }

      const newHomestay = await Homestay.create({
        namehotel: namehotel,
        address: address,
        price: price,
        idcity: idcity,
      });

      res.status(201).json({ success: "Thêm khách sạn thành công" });
    } catch (err) {
      console.error("Lỗi truy vấn CSDL:", err);
      res.status(500).json({ error: "Lỗi truy vấn CSDL" });
    }
  });

  return router;
};
