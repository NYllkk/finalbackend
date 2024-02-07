const express = require("express")

const route = express.Router()
const { CreateBuild, deleteBuild, get, updatedBUild } = require("./projectClientController")

route.post("/created/:id", CreateBuild)
route.delete("/delete/:id", deleteBuild)
route.get("/get", get)
route.put("/put/:id", updatedBUild)
module.exports = route

//    /build/created
// / create