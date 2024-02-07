
const { RES, STATUS } = require("../../common/common");
const Dsr = require("../../db/models/Dsr");
const Employee = require("../../db/models/Employee");
const Project = require("../../db/models/Projects");

const createDsr = async (req, res) => {
    const { employeeName, projects, totalItems, totalHours, EmployeeId } = req.body;
    try {
        console.log(req.body);
        const employee = await Employee.findOne({
            where: { firstName: employeeName }
        });
        if (!employee) {
            console.log('Employee not found');
            return RES(res, STATUS.NOT_FOUND, 'Employee not found');
        }
        const project = await Project.findOne({ where: { title: projects } });
        if (!project) {
            console.log('Project not found');
            return RES(res, STATUS.NOT_FOUND, 'Project not found');
        }
        const createdDsr = await Dsr.create({
            employeeName: employee.firstName,
            projects: project.title,
            totalItems,
            totalHours,
            EmployeeId
        });
        console.log('DSR created:', createdDsr);
        return RES(res, STATUS.OK, 'CREATED SUCCESSFULLY', createdDsr);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
};
const DeleteDsr = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "ID is required");
        }
        const dsr = await Dsr.findByPk(id);
        if (!dsr) {
            return RES(res, STATUS.NOT_FOUND, "DSR not found");
        }
        await dsr.destroy();
        return RES(res, STATUS.OK, "DELETED SUCCESSFULLY", dsr);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};
const updatedDsr = async (req, res) => {
    const { id } = req.params;
    try {
        const { projects, totalItems, totalHours } = req.body;
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "ID NOT FOUND");
        }
        const dsr = await Dsr.findByPk(id);
        if (!dsr) {
            return RES(res, STATUS.NOT_FOUND);
        }
        dsr.projects = projects;
        dsr.totalItems = totalItems;
        dsr.totalHours = totalHours;
        await dsr.save();
        return RES(res, STATUS.OK, "UPDATED SUCCESSFULLY", dsr);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getDsr = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return RES(res, STATUS.BAD_REQUEST, "ID is required");
        }
        const dsr = await Dsr.findByPk(id);
        if (!dsr) {
            return RES(res, STATUS.NOT_FOUND, "DSR not found");
        }
        return RES(res, STATUS.OK, "RETRIEVED SUCCESSFULLY", dsr);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};


module.exports = { createDsr, DeleteDsr, updatedDsr, getDsr };













// models/TimeRecord.js

// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('sqlite::memory:'); // Example SQLite connection

// const TimeRecord = sequelize.define('TimeRecord', {
//     hours: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// });

// module.exports = TimeRecord;

// const TimeRecord = require('./models/TimeRecord');

// // Store a time record
// const storeTime = async (hours, description) => {
//     try {
//         const record = await TimeRecord.create({ hours, description });
//         console.log('Time recorded:', record.toJSON());
//     } catch (error) {
//         console.error('Error recording time:', error);
//     }
// };

// // Example usage:
// storeTime(1.5, 'Task took 1.5 hours');

// Fetch time records
// const fetchTimeRecords = async () => {
//     try {
//         const records = await TimeRecord.findAll();
//         records.forEach(record => {
//             console.log(record.toJSON());
//         });
//     } catch (error) {
//         console.error('Error fetching time records:', error);
//     }
// };

// // Example usage:
// fetchTimeRecords();
