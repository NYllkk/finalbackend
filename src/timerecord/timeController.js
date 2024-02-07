const { RES, STATUS } = require("../../common/common")
const Employee = require("../../db/models/Employee")
const TimeDuration = require("../../db/models/TimeRecord")

// const countTimeInterval = ()=>{

// }

// const startTime = (req, res) => {
//     const { startTime } = req.body
// }
const createTimeDuration = async (req, res) => {
    const { totalduration, EmployeeId, finishedAt, startedAt } = req.body;
    try {
        const employee = await Employee.findByPk(EmployeeId);
        if (!employee) {
            return RES(res, STATUS.NOT_FOUND, "EMPLOYEE NOT FOUND");
        }
        const createdTimeDuration = await TimeDuration.create({
            startedAt,
            finishedAt,
            duration: totalduration,
            EmployeeId,
            totalduration,
        });
        return RES(res, STATUS.OK, createdTimeDuration, "TIME STARTED SUCCESSFULLY");
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

const getEmployeeTime = async (req, res) => {
    try {
        const { id } = req.params
        const timeDurations = await TimeDuration.findAll({
            where: { EmployeeId: id },
            include: [{ model: Employee, as: 'Employee' }],
        })
        return RES(res, STATUS.OK, "getting Employee Time ", timeDurations)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
const deleteTimeDuration = async (req, res) => {
    const { id } = req.params
    try {
        const find = await TimeDuration.findOne({
            where: { EmployeeId: id }
        })
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await find.destroy()
        return RES(res, STATUS.NOT_FOUND)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updateTimeDuration = async (req, res) => {
    const { id } = req.params
    try {
        const { duration, EmployeeId } = req.body
        const find = await TimeDuration.findOne({
            where: { EmployeeId: id }
        })
        if (!find) {
            return res(STATUS.NOT_FOUND)
        }
        find.duration = duration
        find.EmployeeId = EmployeeId
        await find.save()
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createTimeDuration, getEmployeeTime, deleteTimeDuration, updateTimeDuration }



















// const TimeDuration = require('./models/TimeDuration');
// const Employee = require('./models/Employee');

// // Create a new time duration and link it with an employee
// exports.createTimeDuration = async (req, res) => {
//     try {
//         const { duration, employeeId } = req.body;

//         // Validate if the employee exists
//         const employee = await Employee.findByPk(employeeId);
//         if (!employee) {
//             return res.status(404).json({ error: 'Employee not found' });
//         }

//         // Create a new time duration
//         const newTimeDuration = await TimeDuration.create({
//             duration,
//             employeID: employeeId,
//         });

//         res.status(201).json(newTimeDuration);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Retrieve all time durations linked with a specific employee
// exports.getTimeDurationsByEmployee = async (req, res) => {
//     try {
//         const { employeeId } = req.params;

//         // Find all time durations linked with the employee
//         const timeDurations = await TimeDuration.findAll({
//             where: { employeID: employeeId },
//             include: [{ model: Employee, as: 'Employee' }],
//         });

//         res.status(200).json(timeDurations);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Update a time duration
// exports.updateTimeDuration = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { duration, employeeId } = req.body;

//         // Validate if the time duration exists
//         const timeDuration = await TimeDuration.findByPk(id);
//         if (!timeDuration) {
//             return res.status(404).json({ error: 'Time duration not found' });
//         }

//         // Update the time duration
//         timeDuration.duration = duration;
//         timeDuration.employeID = employeeId;
//         await timeDuration.save();

//         res.status(200).json(timeDuration);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// // Delete a time duration
// exports.deleteTimeDuration = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate if the time duration exists
//         const timeDuration = await TimeDuration.findByPk(id);
//         if (!timeDuration) {
//             return res.status(404).json({ error: 'Time duration not found' });
//         }

//         // Delete the time duration
//         await timeDuration.destroy();

//         res.status(200).json({ message: 'Time duration deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
