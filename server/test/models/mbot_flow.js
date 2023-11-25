module.exports = (sequelize, DataTypes) => {
    const mbot_flow = sequelize.define("mbot_flow", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flowName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      textContent: {
        type: DataTypes.STRING,
      },
      imgContent: {
        type: DataTypes.STRING,
      },
      fileContent: {
        type: DataTypes.STRING,
      },
    })
   
    return mbot_flow
   };