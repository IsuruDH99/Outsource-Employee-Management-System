module.exports = (sequelize, DataTypes) => {
    const Daypay = sequelize.define("Daypay", {
      HrID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      DailyRate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    return Daypay;
  };