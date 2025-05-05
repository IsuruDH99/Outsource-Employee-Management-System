module.exports = (sequelize, DataTypes) => {
  const Employee_attendance_view = sequelize.define(
    "Employee_attendance_view",
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
      intime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      outtime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Employee_attendance_view",
      timestamps: false,
    }
  );

  return Employee_attendance_view;
};
