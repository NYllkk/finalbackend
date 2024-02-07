
const { DataTypes } = require("sequelize");
const sequelize = require("../../sequlize")

const PasswordResetToken = sequelize.define('PasswordResetToken', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = PasswordResetToken;
