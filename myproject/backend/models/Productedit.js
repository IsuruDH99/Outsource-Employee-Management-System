module.exports = (sequelize, DataTypes) => {
  const Productedit = sequelize.define("Productedit", {
    productNo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  });

  return Productedit;
};