module.exports = (sequelize, DataTypes) => {
    const KPImonth = sequelize.define("KPImonth", {
      epf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kpiMonth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      
    });
  
    return KPImonth;
  };