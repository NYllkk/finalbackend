
const express = require("express");
const router = express.Router();



const { CreateTask, deletetask, updateTask, getTask } = require("./quickTaskController");
// const uploadMiddleware = require("../../middleware/uploadMiddleware");
// const upload = uploadMiddleware("upload")
// upload.single("file"),
router.post("/qtask", CreateTask);
// router.post("/qtask", upload.array("file", 10), CreateTask);
router.delete("/delete", deletetask)
router.put("/update", updateTask)
router.get("/get", getTask)
module.exports = router;
// router.post('/upload', upload.array('files', 10)


//   /projectcc/qtask





// const CreateTask = (req, res) => {
//     if (req.files.length === 1) {
//         // Single file uploaded
//         const singleFile = req.files[0];
//         // Process singleFile as needed
//     } else if (req.files.length > 1) {
//         // Multiple files uploaded
//         const multipleFiles = req.files;
//         // Process multipleFiles array as needed
//     } else {
//         // No files uploaded
//         // Handle the error or provide a response
//         return res.status(400).send('No files uploaded');
//     }

//     // Continue processing the uploaded files
//     // ...
// };
