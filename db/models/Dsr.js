const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize");
const Employee = require("./Employee");
// Select a Project : Others(Development)


// Others(SEO)
// Select Time(Hours : minutes)
// description




const Dsr = sequelize.define("Dsr", {
    employeeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projects: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalItems: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalHours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EmployeeId: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
    },
});
Dsr.belongsTo(Employee, {
    foreignKey: 'EmployeeId',
    targetKey: "id",

})

module.exports = Dsr