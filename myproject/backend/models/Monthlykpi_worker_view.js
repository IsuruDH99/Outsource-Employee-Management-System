module.exports = (sequelize, DataTypes) => {
  const Monthlykpi_worker_view = sequelize.define(
    "Monthlykpi_worker_view",
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
      name: {
        type: DataTypes.STRING,
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
      tableName: "Monthlykpi_worker_view",
      timestamps: false,
    }
  );

  return Monthlykpi_worker_view;
};
