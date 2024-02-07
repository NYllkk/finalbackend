const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize")

const Note = sequelize.define("Note", {
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT
    },
    Priority: {
        type: DataTypes.ENUM('highest', 'medium', 'low', 'lowest'),
        allowNull: false
    }
});

module.exports = Note;
