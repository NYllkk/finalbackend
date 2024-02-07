const express = require("express")
const router = express.Router()

const { createLeave, DeleteLeave, updatedLeave, getLeave } = require("../leave/LeaveController")
router.post("/leave", createLeave)
router.delete("/delete/:id", DeleteLeave)
router.put("/update/:id", updatedLeave)
router.get("/getleave/:id", getLeave)

module.exports = router
















//    /employee/leave/getleave /: id
// const getEmployeeLeaves = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Find all leave records where EmployeeId matches the provided ID
//         const leaves = await Leave.find({ EmployeeId: id });

//         // Check if any leave records were found
//         if (!leaves || leaves.length === 0) {
//             return RES(res, STATUS.NOT_FOUND, "No leave records found for the employee");
//         }

//         // Return the leave records
//         return RES(res, STATUS.OK, "Leave records retrieved successfully", leaves);
//     } catch (error) {
//         console.error(error.message);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
//     }
// };

// will find all 
// const getEmployeeLeaves = async (req, res) => {
//     try {
//         // Find all leave records
//         const leaves = await Leave.find();

//         // Check if any leave records were found
//         if (!leaves || leaves.length === 0) {
//             return RES(res, STATUS.NOT_FOUND, "No leave records found");
//         }

//         // Return the leave records
//         return RES(res, STATUS.OK, "All leave records retrieved successfully", leaves);
//     } catch (error) {
//         console.error(error.message);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
//     }
// };
