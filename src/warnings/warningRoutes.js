const express = require("express")
const router = express.Router()
const { createWarning } = require("./warnings")

router.post("/login/announcement/:id", createWarning)
module.exports = router

// /admin/warning/login/announcement
