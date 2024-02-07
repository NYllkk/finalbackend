const { error } = require("console")
const { RES, STATUS } = require("../../common/common")
const ProjectClientBuild = require("../../db/models/ProjectClientBuilds")
const projects = require("../../db/models/Projects")


const CreateBuild = async (req, res) => {
    const { title, description, Project, CreatedBy, BuildType, BuildDate } = req.body
    try {
        const { id } = req.params
        const find = await projects.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND, "ID NOT FIND ")
        }
        const updated = await ProjectClientBuild.create({
            title: find.title,
            description,
            Project: find.projectType,
            CreatedBy: find.BDE_BDM,
            BuildType: find.status,
            BuildDate
        })
        return RES(res, STATUS.OK, 'Updated', updated)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const deleteBuild = async (req, res) => {
    const { id } = req.params
    try {
        const find = await ProjectClientBuild.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND, "ID NOT FOUND")
        }
        await find.destroy()
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const get = async (req, res) => {
    try {
        const find = await ProjectClientBuild.findAll({
            where: { CreatedBy: null },
            order: [["id", "ASC"]]
        })
        return RES(res, STATUS.OK, "Getting the Data", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updatedBUild = async (req, res) => {
    const { id } = req.params;
    const { title, description, CreatedBy, BuildType, BuildDate } = req.body;
    try {
        const find = await ProjectClientBuild.findByPk(id);
        if (!find) {
            return RES(res, STATUS.NOT_FOUND);
        }
        find.title = title
        find.description = description
        find.CreatedBy = CreatedBy
        find.BuildType = BuildType
        find.BuildDate = BuildDate
        await find.save();
        return RES(res, STATUS.OK, "UPDATED THE BUILD");
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

module.exports = { CreateBuild, deleteBuild, get, updatedBUild }











// const UpdateBuild = async (req, res) => {
//     const { buildId } = req.params; // Assuming you have the ID of the build you want to update
//     const { updatedTitle, updatedDescription, updatedBuildDate } = req.body;

//     try {
//         const existingBuild = await ProjectClientBuild.findByPk(buildId);

//         if (!existingBuild) {
//             return RES(res, STATUS.NOT_FOUND, "Build ID not found");
//         }

//         // Update the values
//         existingBuild.title = updatedTitle || existingBuild.title;
//         existingBuild.description = updatedDescription || existingBuild.description;
//         existingBuild.buildDate = updatedBuildDate || existingBuild.buildDate;

//         // Save the changes
//         await existingBuild.save();

//         return RES(res, STATUS.OK, "Build updated successfully", existingBuild);
//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };
