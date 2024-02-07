const { RES, STATUS } = require("../../common/common");
const ProjectCoordinator = require("../../db/models/ProjectCoordinator");
const Project = require("../../db/models/Projects")

const createProject = async (req, res) => {
    try {
        const { title, BDE_BDM, projectType, status } = req.body;
        const coordinator = await ProjectCoordinator.findOne({
            where: { name: BDE_BDM }
        });
        if (!coordinator) {
            return RES(res, STATUS.NOT_FOUND);
        }
        const projectCreated = await Project.create({
            title,
            otherInfo: {
                Id: coordinator.id,
                Name: coordinator.name,
                Role: coordinator.role,
                Department: coordinator.department,
            },
            BDE_BDM: coordinator.name,
            projectType,
            status
        });
        return RES(res, STATUS.OK, "DATA CREATED SUCCESSFULLY", projectCreated);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const DeleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND);
        }
        const find = await Project.findByPk(id);
        if (!find) {
            return RES(res, STATUS.NOT_FOUND);
        }
        await find.destroy();
        return RES(res, STATUS.OK, "Project deleted successfully.");
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const updateProject = async (req, res) => {
    const { id } = req.params
    try {
        const { title, projectType, status } = req.body
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const find = await Project.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        find.title = title,
            find.projectType = projectType,
            find.status = status
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const getProject = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return RES(res, STATUS.NOT_FOUND)
    }
    const find = await Project.findByPk(id)
    if (!find) {
        return RES(res, STATUS.NOT_FOUND)
    }
    return RES(res, STATUS.OK, "Getting Project", find)
}
module.exports = {
    createProject, DeleteProject, updateProject, getProject
};
// http://192.168.1.66:2000/api/project/create
// {
//     "title": "Sample Project",
//         "otherInfo": {
//         "Platform": "Upwork",
//             "Upwork Id": "123456",
//                 "Company": "Richestsoft",
//                     "Status": "In Process",
//                         "Project Grade": "A"
//     },
//     "BDE_BDM": "puffin",
//         "projectType": "Web and Mobile",
//             "status": "Active"
// }
