const express = require("express")
const router = express.Router()
const { CreateNote, DeleteNote, updateNote, getNote } = require("./NotesController")

router.post("/createNote", CreateNote)
router.delete("/deleteNote/:id", DeleteNote)
router.put("/updateNote/:id", updateNote)
router.get("/getNote/:id",)
module.exports = router

