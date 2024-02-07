const sequelize = require("../../sequlize");
const { DataTypes } = require("sequelize");
const Employee = require("./Employee");

const Ticket = sequelize.define('Ticket', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    department: {
        type: DataTypes.ENUM('Human Resource', 'Linux Server Admin'),
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM('pending', 'in-progress', 'resolved', 'closed'),
        defaultValue: 'pending',
    },
    EmployeeId: {
        type: DataTypes.INTEGER,
    },
},
);
Ticket.belongsTo(Employee, {
    foreignKey: 'EmployeeId',
    targetKey: "id",

});

module.exports = Ticket;
// time/create