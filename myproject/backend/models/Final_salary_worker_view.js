module.exports = (sequelize, DataTypes) => {
  const Final_salary_worker_view = sequelize.define(
    "Final_salary_worker_view",
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      finalSalary: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
      }
    },
    {
      tableName: "Final_salary_worker_view",
      timestamps: false,
    }
  );

  return Final_salary_worker_view;
};
