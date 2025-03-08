module.exports = (sequelize, DataTypes) => {
    const Workeradd = sequelize.define("Workeradd", {
      epf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      
    });
  
    return Workeradd;
  };