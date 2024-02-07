const { RES, STATUS } = require("../../common/common");
const Student = require("../../db/models/Student");
const StudentModel = require("../../db/models/Student");
const studentValidation = require("../../validations/userValidator")

// const createStudent = async (req, res) => {
//     let { firstName, lastName, Email, section, rollNo } = req.body;
//     try {
//         const student = await StudentModel.create({
//             firstName, lastName, Email, section, rollNo
//         });
//         res.status(200).json({ message: "Student Created Successfully", student });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

const createStudent = async (req, res) => {
    const studentdata = req.body
    const validation = studentValidation.validate(studentdata)
    if (validation.error) {
        return RES(res, STATUS.BAD_REQUEST, validation.error.details[0].message)
    }
    try {
        const student = await Student.create(studentdata)
        RES(res, STATUS.OK, " Student Created Succesfully ")
    } catch (error) {
        console.log(error)
        RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}

const DeleteStudent = async (req, res) => {
    const { StudentId } = req.params;
    try {
        const student = await StudentModel.findByPk(StudentId);
        if (!student) {
            return RES(res, STATUS.NOT_FOUND, 'Student not found');
        }
        await student.destroy();
        RES(res, STATUS.OK, 'Student deleted successfully');
    } catch (error) {
        console.error(error);
        RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
};
const UpdateStudent = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, rollNo, section } = req.body;
    try {
        const updatedStudent = await StudentModel.update({ firstName, lastName, rollNo, section }, { where: { id } });
        RES(res, STATUS.OK, "updated ", updatedStudent)
    } catch (error) {
        console.error('Error:', error);
        RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
};

// const UpdateStudent = async (req, res) => {
//     const { id } = req.params;
//     const { firstName, lastName, rollNo, section } = req.body;
//     try {
//         if (id) {
//             const student = await StudentModel.findByPk(id);
//             console.log(student)
//             if (!student) {
//                 return RES(res, STATUS.NOT_FOUND, 'Student not found');
//             }
//             const updatedStudent = await student.update({ firstName, lastName, rollNo, section });
//             res.status(200).json({ message: "Student updated successfully", updatedStudent });
//         } else {
//             res.status(404).json({ error: "Student ID not provided" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await StudentModel.findByPk(id);
        if (!student) {
            return RES(res, STATUS.NOT_FOUND, 'Student not found');
        }
        RES(res, STATUS.OK, "getting User ", student)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { createStudent, DeleteStudent, UpdateStudent, getStudent };
