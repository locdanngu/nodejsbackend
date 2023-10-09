const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const sequelize = new Sequelize("testnodejs", "root", "", {
  dialect: "mysql", // Loại cơ sở dữ liệu bạn đang sử dụng
  host: "localhost",
});

const Country = require("./models/Country")(sequelize);
const City = require("./models/City")(sequelize);
const Homestay = require("./models/Homestay")(sequelize);

// Kết nối Sequelize đến CSDL
sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối thành công đến CSDL");
  })
  .catch((err) => {
    console.error("Không thể kết nối đến CSDL:", err);
  });

// Kết nối các tệp route
const countryRoutes = require("./routes/countryRoutes");
const cityRoutes = require("./routes/cityRoutes");
const homestayRoutes = require("./routes/homestayRoutes");

// app.use('/api/users', userRoutes);

app.use("/api/country", countryRoutes(sequelize));
app.use("/api/city", cityRoutes(sequelize));
app.use("/api/homestay", homestayRoutes(sequelize));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
