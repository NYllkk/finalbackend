
const sequelize = require("../../sequlize");
const { DataTypes, INTEGER } = require("sequelize");
const Employee = require("./Employee");

const TimeDuration = sequelize.define('TimeDuration', {
    totalduration: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    EmployeeId: {
        type: INTEGER,
        allowNull: false,
    },
    startedAt: {
        type: DataTypes.TIME,
        allowNull: false
    },
    finishedAt: {
        type: DataTypes.TIME,
        allowNull: false
    }
});
TimeDuration.belongsTo(Employee, {
    foreignKey: 'EmployeeId',
    targetKey: "id",

})
module.exports = TimeDuration;










