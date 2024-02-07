const express = require("express")
const router = express.Router()
const isAdmin = require("../../middleware/AdminMiddleware")
const { registerAdmin, adminLogin, updateadmin, deletadmin, getAdmin, forgotpasssword, verifyOtp, resetPassword, assignTask, Deletetask, getEmployeeLeaves, changeLeaveReview, chnageBugstatus, updateTrainingStatus, DeletePC, updatePC, changeticket, deleteProject, DeleteDsr, punchInDetail } = require("../admin/adminController")

router.post("/signup", registerAdmin)
router.post("/login", adminLogin)
// app.use(isAdmin)
router.put("/login/update/:adminId", isAdmin, updateadmin)
router.delete("/login/delete/:userId", deletadmin)
router.get("/login/get/:userId", getAdmin)
router.post("/login/forgot", forgotpasssword)
router.post("/login/verifyotp/:id", verifyOtp);
router.post("/login/reset", resetPassword);
router.post("/login/task", assignTask)
router.delete("/task/deletetask/:taskId", Deletetask)
router.get("/timeRoute", punchInDetail)
// router.use(isAdmin)

// router.post("/announcement", CreateAnnouncement)
// router.get("/login/getannouncement/:id", RetrieveAnnouncement)
// router.delete("/login/DeleteAnnouncement/:id", DeleteAnnouncement)
// router.put("/login/upadteAnnouncement/:id", upadteAnnouncement)
//  for user Leave get 
router.get("/login/getdata/:id", getEmployeeLeaves)
router.put("/login/changeReview/:id", changeLeaveReview)
// ededede
// chnageBUgtatus
router.put("/login/chnageBugStatus/:id", chnageBugstatus)
router.put('/login/training/:trainingId', updateTrainingStatus);
// projectcoodinator
router.delete("/login/pc/:id", DeletePC)
router.put("/update/pc/:id", updatePC)
// ticket
router.put("/update/:id", changeticket)
// deleteproject
router.delete("/delete/:id", deleteProject)
// dsr
router.delete("/dsr/delete/:id", DeleteDsr)
module.exports = router;
// {
//     "status": "Approved"
// }
// admin/dsr/delete/5"
// 
// chnage in token
// router.put("", )
// deletTask isnt 

// http://192.168.1.19:2000/api/admin/warning/login/announcement/1
// for Announcement
// /login/forgot

// http://192.168.1.63:2000/api/admin/signup
// http://192.168.1.63:2000/api/admin/login
// http://192.168.1.63:2000/api/admin/login/update/:adminId
// http://192.168.1.63:2000/api/admin/login/delete/:userId
// http://192.168.1.63:2000/api/admin/login/get/23
// http://192.168.1.63:2000/api/admi/login/forgot
// http://192.168.1.63:2000/api/admi/login/verifyotp/23
// http://192.168.1.63:2000/api/admi/login/reset"
// http://192.168.1.63:2000/api/admin/login/task







