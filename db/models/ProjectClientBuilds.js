const { DataTypes, DATE } = require("sequelize");
const sequelize = require("../../sequlize");
const Project = require("./Projects");

const ProjectClientBuild = sequelize.define("ProjectClientBuild", {
    title: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    Project: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    CreatedBy: {
        type: DataTypes.STRING
    },
    BuildType: {
        type: DataTypes.STRING
    },
    BuildDate: {
        type: DataTypes.DATE
    }
})
// ProjectClientBuild.belongsTo(Project, {
//     foreignKey: "projectid",
// })
// Project.hasMany(ProjectClientBuild, { foreignKey: "projectid" })

module.exports = ProjectClientBuild
// Title	Description	Project	Created By	Build Type	
// TimeEntry.belongsTo(Employee, { foreignKey: 'EmployeeId' });
// Employee.hasMany(TimeEntry, { foreignKey: 'EmployeeId' });
