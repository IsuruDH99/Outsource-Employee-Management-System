module.exports = (sequelize, DataTypes) => {
    const Salarycal = sequelize.define("Salarycal", {
      productNo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    return Salarycal;
  };