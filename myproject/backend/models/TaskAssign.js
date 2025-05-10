module.exports = (sequelize, DataTypes) => {
  const TaskAssign = sequelize.define("TaskAssign", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    epf: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    targetQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetTimeHrs: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "task-assigned",
    },
  });

  return TaskAssign;
};
