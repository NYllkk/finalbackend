const { DataTypes, BelongsTo } = require("sequelize")
const sequelize = require("../../sequlize");
const Employee = require("./Employee");

const Leave = sequelize.define('Leave', {
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, LeaveReview: {
        type: DataTypes.ENUM(['Rejected', 'Accepted']),
        allowNull: true
    },
    Subject: {
        type: DataTypes.STRING,
        allowNull: true
    },
    EmployeeName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LeaveItems: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    LeaveDates: {
        type: DataTypes.DATE,
        allowNull: true
    },
});
Leave.belongsTo(Employee, {
    foreignKey: "EmployeeId",
    targetKey: "id"
})
module.exports = Leave; 