const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  const Homestay = sequelize.define("homestay", {
    idhomestay: {
      type: DataTypes.BIGINT,
      primaryKey: true, // Đặt cột idproduct làm khóa chính
      allowNull: false,
      autoIncrement: true, // Đặt auto-increment
    },
    namehotel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    idcity: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
  }, {
    tableName: 'homestay'
  });

  Homestay.belongsTo(sequelize.models.city, { foreignKey: 'idcity' });
  
  return Homestay;
};
