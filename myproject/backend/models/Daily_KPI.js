module.exports = (sequelize, DataTypes) => {
    const Daily_KPI = sequelize.define(
      "Daily_KPI",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        epf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        productNo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ActualTime: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
      },
      
      }
    );
  
    return Daily_KPI;
};