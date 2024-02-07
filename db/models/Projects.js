const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize");
// const ProjectCoordinator = require("../models/ProjectCoordinator");

const Project = sequelize.define("Project", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // title,otherInfo, BDE_BDM,projectType <is in enums Web and Mobile ,status
    otherInfo: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
    },
    BDE_BDM: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projectType: {
        type: DataTypes.ENUM('Web and Mobile', 'web only', 'Mobile only'),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
// Project.belongsTo(ProjectCoordinator, {
//     foreignKey: 'BDE_BDM',
//     targetKey: "name"
// })

module.exports = Project








// inside other info i want this too
//  Platform:
// Upwork Id:
// Company:Richestsoft
// Status: In Process Project Grade:
//    ohedjb  //
// in this ProjectType assign by Project cordinator 
// BDE_BDM comes from Project cordinator name 
// other Info fiiled by Project Cordinator
// status comes from admin 