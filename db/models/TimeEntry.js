const sequelize = require("../../sequlize")
const { DataTypes, DATEONLY } = require("sequelize");
const Employee = require("./Employee");

const TimeEntry = sequelize.define("TimeEntry", {
    punchType: {
        type: DataTypes.ENUM("in", "out"),
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    // timeStart: {
    //     type: DataTypes.TIME
    // },
    // timeStop: {
    //     type: DataTypes.TIME
    // }

});

TimeEntry.belongsTo(Employee, { foreignKey: 'EmployeeId' });
Employee.hasMany(TimeEntry, { foreignKey: 'EmployeeId' });

module.exports = TimeEntry;





// TimeEntry.belongsTo(Employee);
// Employee.hasMany(TimeEntry);
