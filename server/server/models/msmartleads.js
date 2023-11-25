module.exports = (sequelize, DataTypes) => {
    const msmartleads = sequelize.define("msmartleads", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        leadName: {
            type: DataTypes.STRING,
        },
        leadPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        leadSource: {
            type: DataTypes.STRING,
        },
        leadPresent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        presentRemark: {
            type: DataTypes.STRING,
        },
        leadStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        statusRemark: {
            type: DataTypes.STRING,
        },
        followUpDate: {
            type: DataTypes.DATE,
        },
        rejectionType: {
            type: DataTypes.STRING,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }, {updatedAt:false})

    return msmartleads
   };