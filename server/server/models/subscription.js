module.exports = (sequelize, DataTypes) => {
    const subscription = sequelize.define("subscriptions", {
       username: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       subItem: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       subPeriod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
       startDate: {
           type: DataTypes.DATE,
       },
       endDate: {
            type: DataTypes.DATE,
       },
    })
   
    return subscription
   };