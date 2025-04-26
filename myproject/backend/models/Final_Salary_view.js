module.exports = (sequelize, DataTypes) => {
  const Final_Salary_view = sequelize.define(
    "Final_Salary_view",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      epf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      payment: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
      },

      totalDailySalary: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "Final_Salary_view",
      timestamps: false,
    }
  );

  return Final_Salary_view;
};
