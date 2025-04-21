module.exports = (sequelize, DataTypes) => {
  const ProductTarget = sequelize.define("ProductTarget", {
    productNo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HourlyTarget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return ProductTarget;
};