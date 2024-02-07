const express = require("express")
const router = express.Router()
const istest = require("../../../middleware/testMiddleware.js")
const { CreateUser, LoginUser, forgot, verifytoken, resetpassword, DeleProfile, updateFields, updateImage } = require("./testUser.js")
router.post("/user", CreateUser)
router.post("/login", LoginUser)
router.use(istest)
// in the middleware we just have to match secret key from env in bearer token after splittting it in array
router.post("/forget", forgot)
router.get("/verify", verifytoken)
router.post("/reset", resetpassword)
router.delete("/Delete/:id", DeleProfile)
router.put("/update/:id", updateFields)
router.put("/upadtepic/:id", updateImage)

module.exports = router
// http://192.168.29.84:2000/api/test/update/10
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.

// eyJpZCI6MSwiZW1haWwiOiJwdWZmaW5AeW9wbWFpbC5jb20iLCJpYXQiOjE3MDU0MDEyOTMsImV4cCI6MTcwNTQwNDg5M30.auJb_R - Aert4x8znwuP9iFSMeo4Bv536Y1RGE91D0BU