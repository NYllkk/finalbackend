const express = require("express")
const router = express.Router()
const { punchIn, deletePunch, getPunch } = require("./timeCont")
router.post("/time/:id", punchIn)
// router.post("/punchout/:id", punchOut)
router.delete("/time/:id", deletePunch)
router.get("/time", getPunch)

module.exports = router
// /timeRoute/time/:id