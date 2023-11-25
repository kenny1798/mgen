module.exports = (sequelize, DataTypes) => {
    const msmart_teams = sequelize.define("msmart_teams", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tpos: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    return msmart_teams
   };