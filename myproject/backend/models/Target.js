module.exports = (sequelize, DataTypes) => {
    const Target = sequelize.define("Target", {
      productNo: {
        type: DataTypes.STRING,
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
      },
      packSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hourlyTarget: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    return Target;
  };