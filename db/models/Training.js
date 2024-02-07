const sequelize = require("../../sequlize");
const { DataTypes } = require("sequelize");

const Training = sequelize.define("Training", {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Approved', 'NotApproved', 'New'),
        allowNull: true,
        defaultValue: 'New'
    },
    trainingType: {
        type: DataTypes.ENUM('Beginner', 'Project'),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
module.exports = Training;
