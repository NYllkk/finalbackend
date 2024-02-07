const express = require("express");
const router = express.Router();

const { DeleteStudent, createStudent, UpdateStudent, getStudent } = require("../student/StudentController");
router.post("/", createStudent)
router.delete("/:StudentId", DeleteStudent)
router.put("/:id", UpdateStudent)
router.get("/:id", getStudent)
module.exports = router
