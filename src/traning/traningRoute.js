const express = require("express")
const router = express.Router()

const { CreateTraining, DeleTraining, getTraining, updatetraining } = require("./traningController")
router.post("/CreateTraining", CreateTraining)
router.delete("/deletetraining/:id", DeleTraining)
router.get("/gettraining", getTraining)
router.put("/updateTraning", updatetraining)


module.exports = router

// const { createLeave, DeleteLeave, updatedLeave, getLeave } = require("../leave/LeaveController")
// router.post("/leave", createLeave)
// router.delete("/delete/:id", DeleteLeave)
// router.put("/update/:id", updatedLeave)
// router.get("/getleave/:id", getLeave)