
const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.createTable('Employee', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });


    await queryInterface.addColumn('Task', 'EmployeeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Employee',
        key: 'id'
      },
      allowNull: true
    });
  },
  down: async (queryInterface) => {

    await queryInterface.removeColumn('Task', 'EmployeeId');


    await queryInterface.dropTable('Employee');
  }
}

// const { DataTypes, Sequelize } = require('sequelize');
// //  npx sequelize - cli db: migrate
// //  npx sequelize - cli db: migrate: undo: all
// // npx sequelize - cli db: seed: all
// module.exports = {
//   up: async (queryInterface) => {
//     queryInterface.createTable('Employee', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       firstName: {
//         type: DataTypes.STRING
//       },
//       lastName: {
//         type: DataTypes.STRING
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true
//       },
//       profilePicture: {
//         type: DataTypes.STRING,
//       },
//       password: {
//         type: DataTypes.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//     })
//   },
//   down: (queryInterface) => {
//     return queryInterface.dropTable('Employee');
//   }
// }