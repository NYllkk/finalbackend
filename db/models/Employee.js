const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../sequlize");

const Employee = sequelize.define("Employee", {
    firstName: {
        type: DataTypes.STRING,
        unique: false,
    },
    lastName: {
        type: DataTypes.STRING,
        unique: false,
    },
    profilePicture: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    googleId: {
        type: DataTypes.STRING,
        unique: true,
    },
    displayName: {
        type: DataTypes.STRING,
    },
});

module.exports = Employee;
// employee db

// // 
// const { DataTypes } = require('sequelize');
// const sequelize = require('../../path-to-sequelize-instance'); // Update the path to your Sequelize instance

// const defineEmployeeModel = () => {
//     return sequelize.define('Employee', {
//         firstName: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//         lastName: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//         profilePicture: {
//             type: DataTypes.STRING,
//         },
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING,
//         },
//     }, {
//         // Other model options
//     });
// };

// module.exports = defineEmployeeModel;











