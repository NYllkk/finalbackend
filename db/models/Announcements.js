const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize");
const Admin = require("./Admin");

const Announcement = sequelize.define('Announcement', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    AdminId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
Announcement.belongsTo(Admin, {
    foreignKey: "AdminId",
    targetKey: "id"
});
module.exports = Announcement
