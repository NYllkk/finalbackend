const { title } = require("process");
const { RES, STATUS } = require("../../common/common")
const Employee = require("../../db/models/Employee")
const QuickTask = require("../../db/models/QuickTask");
const formidable = require("formidable");


const { processFormFields } = require("../../utils/helper");
const Task = require("../../db/models/Task");
const { uploadImage } = require("../../common/upload/uploadFile");


// below one is with multer 
// const CreateTask = async (req, res) => {
//     const { title, file, sendTo, project, summary, description, hours, priority } = req.body;
//     try {
//         const employee = await Employee.findOne({
//             where: { email: sendTo }
//         });
//         if (!employee) {
//             return RES(res, STATUS.NOT_FOUND, "Employee not found");
//         }
//         const task = await QuickTask.create({
//             title,
//             file,
//             sendTo,
//             project,
//             summary,
//             description,
//             hours,
//             priority
//         });
//         if (req.file) {
//             const fileURL = `${req.protocol}://${req.get("host")}/fileUpload/${req.file.filename}`;
//             task.file = fileURL;
//             await task.save();
//         }
//         return RES(res, STATUS.OK, "Task created successfully", task);
//     } catch (error) {
//         console.error("Error creating task:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "An error occurred while creating the task");
//     }
// };

const CreateTask = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            if (error) {
                return RES(res, STATUS.INTERNAL_SERVER_ERROR);
            }
            const processedFields = processFormFields(fields);
            const { title, sendTo, project, summary, description, hours, priority, } = processedFields;
            let fileUrl = "";
            if (files.file) {
                const imagePath = files.file.path;
                const public_id = await uploadImage(imagePath);
                console.log(public_id, "here in public id ")
                fileUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload}}`;
            }
            const createdTask = await QuickTask.create({
                title,
                sendTo,
                project,
                summary,
                description,
                hours,
                priority,
                file: fileUrl
            });
            return RES(res, STATUS.OK, "ok", createdTask);
        });
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

const deletetask = async (req, res) => {
    const { id } = req.params
    try {
        const find = await QuickTask.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await find.destroy()
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, file, sendTo, project, summary, description, hours, priority } = req.body;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "Task ID is required");
        }
        const task = await QuickTask.findByPk(id);
        if (!task) {
            return RES(res, STATUS.NOT_FOUND, "Task not found");
        }
        task.title = title;
        task.file = file;
        task.sendTo = sendTo;
        task.project = project;
        task.summary = summary;
        task.description = description;
        task.hours = hours;
        task.priority = priority;

        await task.save();
        return RES(res, STATUS.OK, "Task updated successfully", task);
    } catch (error) {
        console.error("Error updating task:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};

const getTask = async (req, res) => {
    try {
        const tasks = await QuickTask.findAll({ order: [['id', 'DESC']] });
        return RES(res, STATUS.OK, "Got the tasks", tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};

module.exports = { CreateTask, deletetask, updateTask, getTask }




























// const updateTask = async (req, res) => {
//     const { id } = req.params;
//     const { title, file, sendTo, project, summary, description, hours, priority } = req.body;

//     try {
//         if (!id) {
//             return RES(res, STATUS.NOT_FOUND, "Task ID is required");
//         }

//         const [updatedRowsCount] = await QuickTask.update({
//             title,
//             file,
//             sendTo,
//             project,
//             summary,
//             description,
//             hours,
//             priority
//         }, {
//             where: { id }
//         });

//         if (updatedRowsCount === 0) {
//             return RES(res, STATUS.NOT_FOUND, "Task not found");
//         }

//         return RES(res, STATUS.OK, "Task updated successfully");
//     } catch (error) {
//         console.error("Error updating task:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
//     }
// };
