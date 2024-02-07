const express = require("express")
const route = express.Router()

const { CreateAnnouncement, RetrieveAnnouncement, DeleteAnnouncement, upadteAnnouncement } = require("./announcementController")

route.post("/create", CreateAnnouncement)

route.get("/get", RetrieveAnnouncement)

route.put("/update", upadteAnnouncement)

route.delete("/delete", DeleteAnnouncement)

module.exports = route

// / announcement/create