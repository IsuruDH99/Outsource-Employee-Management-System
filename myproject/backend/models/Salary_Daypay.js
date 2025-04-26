// module.exports = (sequelize, DataTypes) => {
//   const Salary_Daypay = sequelize.define('Salary_Daypay', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       epf: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       workHrsNormal: {
//           type: DataTypes.DECIMAL(5, 2),
//           allowNull: false,
//       },
//       dailySalary: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false
//       },
//     });
//     return Salary_Daypay;
// };
// models/SalaryDaypay.js
module.exports = (sequelize, DataTypes) => {
  const Salary_Daypay = sequelize.define(
    "Salary_Daypay",
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
      dailySalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      overtimeHours: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    overtimeSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    totalDailySalary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
    }
  );

  return Salary_Daypay;
};