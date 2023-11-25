module.exports = (sequelize, DataTypes) => {
    const mgenqueue = sequelize.define("mgenqueue", {
        leadName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        leadPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        session_client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        queue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    })

    return mgenqueue
   };