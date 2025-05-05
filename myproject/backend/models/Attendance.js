module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    epf: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
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
  });

  return Attendance;
};
