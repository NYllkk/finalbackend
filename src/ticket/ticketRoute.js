const express = require("express")
const route = express.Router()
const { CreateTicket, updateTicket, deleteTicket, findTicket } = require("../../src/ticket/ticketController")
const router = require("../admin/adminRoute")

route.post("/create", CreateTicket)
route.patch("/update/:id", updateTicket)
router.delete("/delete/:id", deleteTicket)
router.get("/get", findTicket)
module.exports = route

