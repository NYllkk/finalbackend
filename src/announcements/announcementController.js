const { json } = require("sequelize")
const { RES, STATUS } = require("../../common/common")
const Announcement = require("../../db/models/Announcements")
const Admin = require("../../db/models/Admin")

const CreateAnnouncement = async (req, res) => {
    const { content, AdminId } = req.body;
    try {
        const admin = await Admin.findByPk(AdminId);
        if (!admin) {
            return RES(res, STATUS.NOT_FOUND, "NOT FOUND", admin)
        }
        const announcement = await Announcement.create({ content, AdminId });
        return RES(res, STATUS.OK, "ANNOUNCEMENT CREATED", announcement)
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
};
const RetrieveAnnouncement = async (req, res) => {
    const { id } = req.params
    try {
        const announcement = await Announcement.findByPk(id)
        if (!announcement) {
            return RES(res, STATUS.NOT_FOUND)
        }
        return RES(res, STATUS.OK, "GOT THE ANNOUNCEMENT", announcement)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const DeleteAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const announcement = await Announcement.findByPk(id);
        if (!announcement) {
            return res.status(404).send("Announcement not found");
        }
        await announcement.destroy();
        res.status(200).send("Announcement deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}
const upadteAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const { content } = req.body;
        const announcement = await Announcement.findByPk(id);
        if (!announcement) {
            return res.status(404).send("Announcement not found");
        }
        announcement.content = content;
        await announcement.save();
        return res.status(200).json(announcement);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = { CreateAnnouncement, RetrieveAnnouncement, DeleteAnnouncement, upadteAnnouncement }
