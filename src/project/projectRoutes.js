const express = require("express")
const route = express.Router()

const { createProject, DeleteProject, updateProject, getProject } = require("./projectController")
route.post("/create", createProject)
route.delete("/delete/:id", DeleteProject)
route.put("/update/:id", updateProject)
route.put("/get/:id", getProject)

module.exports = route
//project/create
