module.exports = (sequelize, DataTypes) => {
    const trial = sequelize.define("trials", {
       username: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       trialItem: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       isExpired: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
    },
       startDate: {
           type: DataTypes.DATE,
       },
       endDate: {
            type: DataTypes.DATE,
       },
    })
   
    return trial
   };