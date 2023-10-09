const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  const City = sequelize.define("city", {
    idcity: {
      type: DataTypes.BIGINT,
      primaryKey: true, // Đặt cột idproduct làm khóa chính
      allowNull: false,
      autoIncrement: true, // Đặt auto-increment
    },
    namecity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idcountry: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    imagecity: {
      type: DataTypes.STRING,
    }
  }, {
    tableName: 'city'
  });

  City.belongsTo(sequelize.models.country, { foreignKey: 'idcountry' });
  
  return City;
};
