const { RES, STATUS } = require("../../common/common")
const Warning = require("../../db/models//Warnings");
const Employees = require("../../db/models/Employee");

const createWarning = async (req, res) => {
    const { action, title, level, toUser } = req.body;
    try {
        const employee = await Employees.findByPk(toUser);
        if (!employee) {
            return RES(res, STATUS.NOT_FOUND, "EMPLOYEE NOT FOUND ");
        }
        // if (req.user.role !== "ADMIN") {
        //     return RES(res, STATUS.UNAUTHORIZED, "ONLY ADMIN CAN ISSUE WARNINGS ");
        // }
        const warning = await Warning.create({
            action,
            title,
            level,
            toUser,
            createdBy: employee.id || 1
        });
        return RES(res, STATUS.OK, "WARNINIG ISSUED", warning);
    } catch (error) {
        console.error("Error issuing warning:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
module.exports = { createWarning };















