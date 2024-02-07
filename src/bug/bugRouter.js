const express = require("express")
const router = express.Router()
const { CreateBug, getbug, DeleteBug, UpdateBug } = require("./BugController")
router.post("/createBug", CreateBug)
router.get("/getBug/:bugId", getbug)
router.delete("/deleteBug/:id", DeleteBug)
router.put("/updateBug/:id", UpdateBug)
module.exports = router

//    /employee/bug/getBug/18


// New 
// inprogress
// Resolved 
// closed

// / employee / bug