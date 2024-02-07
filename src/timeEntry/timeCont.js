const TimeEntry = require("../../db/models/TimeEntry")
const Employee = require("../../db/models/Employee");
const { RES, STATUS } = require("../../common/common");

const punchIn = async (req, res) => {
    const { id } = req.params;
    const { punchType } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        let newPunchType;
        if (punchType === "in") {
            newPunchType = "in";
        } else {
            newPunchType = "out";
        }
        const timeEntry = await TimeEntry.create({
            punchType: newPunchType,
        });
        await employee.addTimeEntry(timeEntry);
        return RES(res, STATUS.OK, "entered", timeEntry);
    } catch (error) {
        console.error('Error punching in:', error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const deletePunch = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const find = await TimeEntry.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await find.destroy()
        return RES(res, STATUS.OK, "Deleted")
    } catch (error) {
        console.log(error)
    }
}
const getPunch = async (req, res) => {
    // const { id } = req.params
    const find = await TimeEntry.findAll({
    })
    return RES(res, STATUS.OK, "getting the data", find)
}

module.exports = {
    punchIn,
    deletePunch, getPunch
};
