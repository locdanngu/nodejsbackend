const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Country = sequelize.define("country", {
    idcountry: {
      type: DataTypes.BIGINT,
      primaryKey: true, // Đặt cột idproduct làm khóa chính
      allowNull: false,
      autoIncrement: true, // Đặt auto-increment
    },
    namecountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'country' // Đặt tên bảng cụ thể là 'product'
  });

  // Thiết lập mối quan hệ với bảng country
  
  
  return Country;
};
