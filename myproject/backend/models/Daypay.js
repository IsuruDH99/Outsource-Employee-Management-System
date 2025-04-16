module.exports = (sequelize, DataTypes) => {
    const Daypay = sequelize.define("Daypay", {
      HrID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      HourlyRate: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Daypay;
  };