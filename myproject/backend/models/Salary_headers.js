module.exports = (sequelize, DataTypes) => {
    const Salary_headers = sequelize.define('Salary_headers', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        epf: {
          type: DataTypes.STRING,
          allowNull: false
        },
        totalPayment: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
      });
      return Salary_headers;
  };