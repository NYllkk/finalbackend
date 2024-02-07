const { RES, STATUS } = require("../../common/common")
const Note = require("../../db/models/Note")


const CreateNote = async (req, res) => {
    try {
        const { Title, Description, Priority } = req.body;
        const createdNote = await Note.create({ Title, Description, Priority });
        return RES(res, STATUS.OK, "Note created successfully", createdNote);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const DeleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "ID NOT PROVIDED");
        }
        const DeleteNote = await Note.findByPk(id);
        if (!DeleteNote) {
            return RES(res, STATUS.NOT_FOUND, "Note not found");
        }
        await DeleteNote.destroy();
        return RES(res, STATUS.OK, "Note deleted successfully");
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { Title, Description, Priority } = req.body;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "ID ISNT MATCHED");
        } const note = await Note.findByPk(id);
        if (!note) {
            return RES(res, STATUS.NOT_FOUND, "Note not found");
        }
        const updatedNote = await note.update({ Title, Description, Priority });
        return RES(res, STATUS.OK, "Note updated successfully", updatedNote);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const getNote = async (req, res) => {
    const { id } = req.params
    try {
        const find = await Note.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        return RES(res, STATUS.OK, "find Note", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { CreateNote, DeleteNote, updateNote, getNote };









// const updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { Title, Description, Priority } = req.body;
//     try {
//         if (!id) {
//             return RES(res, STATUS.NOT_FOUND, "ID NOT FOUND");
//         }

//         // Update the note with the provided ID
//         const [updatedRowsCount, updatedRows] = await NoteModel.update(
//             { Title, Description, Priority },
//             { where: { id } }  // Specify the condition
//         );

//         // Check if any rows were updated
//         if (updatedRowsCount === 0) {
//             return RES(res, STATUS.NOT_FOUND, "Note not found");
//         }

//         return RES(res, STATUS.OK, "Updated successfully", updatedRows);

//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };

// module.exports = updateNote;







// const updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { Title, Description, Priority } = req.body;

//     try {
//         const [updatedRowsCount, updatedRows] = await NoteModel.update(
//             { Title, Description, Priority },
//             { where: { id } }
//         );

//         if (updatedRowsCount === 0) {
//             return res.status(404).send("Note not found");
//         }

//         return res.status(200).send(updatedRows);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// };

// module.exports = updateNote;
