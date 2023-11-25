module.exports = (sequelize, DataTypes) => {
    const mgenleads = sequelize.define("mgenleads", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        session: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        leadName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        leadPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    return mgenleads
   };