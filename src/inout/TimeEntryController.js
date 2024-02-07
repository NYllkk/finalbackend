const express = require("express")
const router = express.Router()
const { createTime } = require("./TimeEntryRoute")
router.post("/inout", createTime)

module.exports = router







// in googleAuthController.js

// const Employee = require('../db/models/Employee');
// const { RES, STATUS } = require('../common/common');

// const googleSignup = async (profile) => {
//     try {
//         let employee = await Employee.findOne({ where: { googleId: profile.id } });
//         if (!employee) {
//             employee = await Employee.create({
//                 googleId: profile.id,
//                 displayName: profile.displayName,
//             });
//         }
//         return employee;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

// module.exports = { googleSignup };





// strategy
// in googleAuthController.js

// const { googleSignup } = require('./googleAuthController');

// const googleStrategyCallback = async (accessToken, refreshToken, profile, done) => {
//     try {
//         const employee = await googleSignup(profile);
//         return done(null, employee);
//     } catch (error) {
//         console.error(error);
//         return done(error);
//     }
// };

// module.exports = googleStrategyCallback;



// in authMiddleware.js

// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated() && req.user) {
//         return next();
//     }
//     return RES(res, STATUS.UNAUTHORIZED, 'User not authenticated');
// };

// module.exports = { isAuthenticated };




// // Create a punch-in entry
// const punchInEntry = await TimeEntry.create({
//     punchType: "in",
//     EmployeeId: employeeId, // Replace with the actual employee ID
// });

// // Create a punch-out entry
// const punchOutEntry = await TimeEntry.create({
//     punchType: "out",
//     EmployeeId: employeeId, // Replace with the actual employee ID
// });


// db
// const Employee = sequelize.define("Employee", {
//     // ... other fields

//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false, // Assuming email is required
//         validate: {
//             isEmail: true, // Validate as an email address
//         },
//     },

//     googleId: {
//         type: DataTypes.STRING,
//         unique: true,
//     },
//     displayName: {
//         type: DataTypes.STRING,
//     },
// }, {
//     indexes: [
//         {
//             unique: true,
//             fields: ['email'],
//         },
//         {
//             unique: true,
//             fields: ['googleId'],
//         },
//     ],
// });

// // ... other model configurations
