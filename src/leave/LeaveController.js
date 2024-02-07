const { RES, STATUS } = require("../../common/common")
const Employees = require("../../db/models/Employee")
const Leave = require("../../db/models/Leave")

const createLeave = async (req, res) => {

    const { Subject, EmployeeName, LeaveItems, LeaveDates } = req.body
    try {
        // const existingLeave = Leave.findOne({
        //     Subject,
        //     EmployeeName,
        //     LeaveItems,
        //     LeaveDates
        // })
        // if (existingLeave) {
        //     return RES(res, STATUS.BAD_REQUEST,"Leave is added alreay")
        // }
        const employee = await Employees.findOne({
            where: {
                firstName: EmployeeName
            }
        })
        if (!employee) {
            return RES(res, STATUS.NOT_FOUND, "NO EMPLOYEE FOUND")
        }
        const createLeave = await Leave.create({
            EmployeeId: employee.id,
            Subject,
            EmployeeName: employee.firstName,
            LeaveItems,
            LeaveDates
        })
        return RES(res, STATUS.OK, "Leave Created", createLeave)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const DeleteLeave = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "user Not Found")
        }
        const LeavetoDelete = await Leave.findByPk(id)

        if (!LeavetoDelete) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await LeavetoDelete.destroy()
        return RES(res, STATUS.OK, "DELETED SUCCESFULLY", LeavetoDelete)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updatedLeave = async (req, res) => {
    const { id } = req.params
    const { Subject, EmployeeName, LeaveItems, LeaveDates } = req.body
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const leaveToUpdate = await Leave.findByPk(id)
        if (!leaveToUpdate) {
            return RES(res, STATUS.NOT_FOUND)
        }
        leaveToUpdate.Subject = Subject
        leaveToUpdate.EmployeeName = EmployeeName
        leaveToUpdate.LeaveItems = LeaveItems
        leaveToUpdate.LeaveDates = LeaveDates
        await leaveToUpdate.save()
        return RES(res, STATUS.OK, leaveToUpdate)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const getLeave = async (req, res) => {
    const { id } = req.params;
    console.log(id, "here in id ")
    try {
        const leave = await Leave.findByPk(id);
        if (!leave) {
            return RES(res, STATUS.NOT_FOUND, "NoT FOUND");
        }
        return RES(res, STATUS.OK, "LEAVE RETRIEVED", leave);
    } catch (error) {
        console.error(error.message);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
module.exports = { createLeave, DeleteLeave, updatedLeave, getLeave }
















