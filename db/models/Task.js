const { DataTypes, DATEONLY } = require('sequelize');
const sequelize = require("../../sequlize")

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    dueDate: {
        type: DataTypes.DATE,
    },
    dueTime: {
        type: DataTypes.TIME,
    },
    state: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending',
    },
    EmployeeId: {
        type: DataTypes.INTEGER
    },
    stateChangeTimestamp: {
        type: DataTypes.TIME,
        allowNull: true,
        precision: 6
    }



});

module.exports = Task;


// // below with the controller

// const updateTaskState = async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         const task = await Task.findByPk(taskId);

//         if (!task) {
//             return RES(res, STATUS.NOT_FOUND, "Task not found");
//         }

//         // Check if the task belongs to the requesting employee
//         if (task.EmployeeId !== req.employee.id) {  // assuming you have a middleware to attach employee data to the request
//             return RES(res, STATUS.FORBIDDEN, "You are not authorized to update this task");
//         }

//         // Update the task state to "in-progress"
//         task.state = 'in-progress';
//         await task.save();

//         return RES(res, STATUS.OK, "Task state updated to in-progress successfully", task);
//     } catch (error) {
//         console.error("Error updating task state:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// }
// 







// plne B to work 

// const updateTaskState = async (req, res) => {
//     try {
//         const { taskId } = req.params;
//         const task = await Task.findByPk(taskId);

//         if (!task) {
//             return res.status(404).json({ message: "Task not found" });
//         }

//         if (task.EmployeeId !== req.employee.id) {
//             return res.status(403).json({ message: "You are not authorized to update this task" });
//         }
//         task.state = 'in-progress';
//         await task.save();

//         return res.status(200).json({ message: "Task state updated to in-progress successfully", task });
//     } catch (error) {
//         console.error("Error updating task state:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// }
















// const { DataTypes } = require('sequelize');
// const sequelize = require("../../sequlize");

// const Task = sequelize.define('Task', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//     },
//     dueDate: {
//         type: DataTypes.DATE,
//     },
//     state: {
//         type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
//         defaultValue: 'pending',
//     },
//     EmployeeId: {
//         type: DataTypes.INTEGER,
//         allowNull: false, // assuming a task always belongs to an employee
//         references: {
//             model: 'Employees', // Make sure to use the exact model name here
//             key: 'id'
//         }
//     }
// });

// module.exports = Task;

// below with the send mail 

// const assignTask = async (req, res) => {
//     try {
//         const { title, description, dueDate, EmployeeId } = req.body;
//         const employee = await Employees.findByPk(EmployeeId);

//         if (!employee) {
//             return RES(res, STATUS.NOT_FOUND, "Employee not found");
//         }

//         // Create the task
//         const task = await Task.create({
//             title,
//             description,
//             dueDate,
//             state: 'pending',
//             EmployeeId,
//         });

//         // Send notification to the employee
//         const emailContent = {
//             title: 'New Task Assigned',
//             description: `You have been assigned a new task: ${title}`
//         };

//         // Assume you have a function `sendNotification` that sends an email to the employee
//         const info = await sendMail(employee.email, emailContent.title, emailContent.description);
//         console.log("Email sent:", info);


//         // Update the task state to "in-progress"
//         task.state = 'in-progress';
//         await task.save();

//         return RES(res, STATUS.OK, "Task assigned and employee notified successfully", task);
//     } catch (error) {
//         console.error("Error assigning task:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// }

// const express = require('express');
// const router = express.Router();
// const employeeController = require('./path-to-your-employee-controller-file');

// router.put('/tasks/:taskId/state', employeeController.updateTaskState);

// module.exports = router;










