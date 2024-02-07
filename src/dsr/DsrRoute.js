const express = require("express")
const route = express.Router()
const { createDsr, DeleteDsr, updatedDsr, getDsr } = require("./DsrController")


route.post("/create", createDsr)
route.delete("/delete/:id", DeleteDsr)
route.put('/updated/:id', updatedDsr);
route.get("/get/:id", getDsr)

module.exports = route

//   /dsr/create