module.exports = (sequelize, DataTypes) => {
  const KPImonthly_view = sequelize.define(
    "KPImonthly_view",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      epf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      productNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      targetTimeHrs: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      ActualTime: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },
    {
      tableName: "KPImonthly_view",
      timestamps: false,
    }
  );

  return KPImonthly_view;
};
