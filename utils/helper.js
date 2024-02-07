const jwt = require("jsonwebtoken");
const { RES, STATUS } = require("../common/common");
require("dotenv").config();

const createToken = (payload, expiresIn) => {
    const secretKey = process.env.JWT_SECRET_KEY
    console.log(secretKey, "in secretr key")
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })
    // return RES(res, STATUS.OK, "created TOKEn ", token)
    return token
};
const convertArrayValuesToSingle = (obj) => {
    for (const prop in obj) {
        if (Array.isArray(obj[prop])) {
            obj[prop] = obj[prop][0];
        }
    }
    return obj;
};
let processFormFields = (arr) => {
    let processedFields = {};
    for (const [key, value] of Object.entries(arr)) {
        processedFields[key] = Array.isArray(value) ? value[0] : value;
    }
    return processedFields;
};

module.exports = { createToken, convertArrayValuesToSingle, processFormFields }












// updatePC







// const { Sequelize, DataTypes } = require('sequelize');
//  
// const sequelize = new Sequelize('sqlite::memory:'); // Example SQLite connection

// const TimerRecord = sequelize.define('TimerRecord', {
//     startTime: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },

//     stopTime: {
//         type: DataTypes.DATE,
//         allowNull: true, 
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// });

// module.exports = TimerRecord;

// const TimerRecord = require('./models/TimerRecord');

// const recordStartTime = async (description) => {
//     try {
//         const record = await TimerRecord.create({ startTime: new Date(), description });
//         console.log('Start time recorded:', record.toJSON());
//     } catch (error) {
//         console.error('Error recording start time:', error);
//     }
// };

// const recordStopTime = async (description) => {
//     try {
//       
//         const record = await TimerRecord.findOne({
//             where: { stopTime: null },
//             order: [['startTime', 'DESC']],
//         });
//         if (record) {
//             record.stopTime = new Date();
//             await record.save();
//             console.log('Stop time recorded:', record.toJSON());
//         } else {
//             console.log('No ongoing task found.');
//         }
//     } catch (error) {
//         console.error('Error recording stop time:', error);
//     }
// };

// // Example usage:
// // Start a new task
// recordStartTime('Task A');

// // Stop the ongoing task
// recordStopTime('Task A');





// wiil work  time store wiil check ticket route file  
// middleware/auth.js
//   
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// const authenticateAdmin = (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.email !== process.env.ADMIN_EMAIL) {
//             throw new Error("Unauthorized");
//         }
//         req.admin = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// };

// module.exports = authenticateAdmin;

// routes/adminRoutes.js
// const express = require("express");
// const router = express.Router();
// const authenticateAdmin = require("../middleware/auth");

// router.get("/admin/dashboard", authenticateAdmin, (req, res) => {
//     res.json({ message: "Admin Dashboard" });
// });

// // Add more admin-only routes as needed

// module.exports = router;

// middleware/errorHandler.js
// const errorHandler = (error, req, res, next) => {
//     console.error(error.stack);
//     res.status(500).json({ message: "Internal Server Error" });
// };

// module.exports = errorHandler;

// const express = require("express");
// const adminRoutes = require("./routes/adminRoutes");
// const errorHandler = require("./middleware/errorHandler");

// const app = express();

// app.use(express.json());

// // Admin Routes
// app.use(adminRoutes);

// // Error Handler Middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });











// eiorhvgyfyergfergeyfgcyfegfcyevyyvyg

// creating new token
// await PasswordResetToken.create({
// userId: user.id,
// token: resetToken,

//     // expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour expiration
// });


// const createLeave = async (req, res) => {
//     const { Subject, EmployeeName, LeaveItems, LeaveDates } = req.body;

//     try {
//         // Check if all required fields are present in the request body
//         if (!Subject || !EmployeeName || !LeaveItems || !LeaveDates) {
//             return res.status(400).json({ error: "All fields are required." });
//         }

//         // Create a new Leave record in the database
//         const newLeave = await Leave.create({
//             Subject,
//             EmployeeName,
//             LeaveItems,
//             LeaveDates
//         });

//         // Return the created Leave record in the response
//         return res.status(201).json(newLeave);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports = createLeave;

// weiohugdue

// const createLeave = async (req, res) => {
//     const { Subject, EmployeeName, LeaveItems, LeaveDates } = req.body;

//     try {
//        
//         const employee = await Employees.findOne({
//             where: {
//                 firstName: EmployeeName 
//             }
//         });

//         if (!employee) {
//             return RES(res, STATUS.NOT_FOUND, "Employee not found");
//         }

//         // Assuming Leave model is defined and you are using it to create a new leave entry
//         const createLeaveEntry = await Leave.create({
//             Subject,
//             EmployeeId: employee.id, // Storing the employee's ID in the Leave table
//             LeaveItems,
//             LeaveDates
//         });

//         return RES(res, STATUS.OK, "Leave Created", {
//             leave: createLeaveEntry,
//             employeeId: employee.id // Sending the employee's ID in the response
//         });

//     } catch (error) {
//         console.log(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// }
// 
// models/TimerRecord.js
