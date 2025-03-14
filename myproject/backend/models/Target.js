module.exports = (sequelize, DataTypes) => {
    const Target = sequelize.define("Target", {
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
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Target;
  };