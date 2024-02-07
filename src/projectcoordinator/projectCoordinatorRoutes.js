const express = require("express")
const router = express.Router()
const { CreatePC, LoginPC, forgotpasssword, verifytoken, updatePassword } = require("./projectCoordinatorController")

router.post("/create", CreatePC)
router.post("/login", LoginPC)
router.post("/forget", forgotpasssword)
router.get("/verify", verifytoken)
router.put("/updatepassword", updatePassword)



module.exports = router
//  /pc/create
// http://192.168.1.43:2000/api/pc/verify?token=efvervgerfff

// http://192.168.1.43:2000/api/pc/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsInVzZXJtYWlsIjoicHVmZmluQHlvcG1haWwuY29tIiwiaWF0IjoxNzA0MTkzMDkwLCJleHAiOjE3MDQxOTY2OTB9.cZlCNNPDfzIyrVzSH32UPcefj0RJclnLhPCIOnkeTuA