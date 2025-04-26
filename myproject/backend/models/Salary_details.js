module.exports = (sequelize, DataTypes) => {
    const Salary_details = sequelize.define('Salary_details', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        epf: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        productNo: {
          type: DataTypes.STRING,
          allowNull: false
        },
        productName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        payment: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
      });
      return Salary_details;
  };