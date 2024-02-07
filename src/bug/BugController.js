const { RES, STATUS } = require("../../common/common");
const Bug = require("../../db/models/Bug");
const Employees = require("../../db/models/Employee");

const CreateBug = async (req, res) => {
    const { title, description, createdBy } = req.body;
    if (!title || !description || !createdBy) {
        return RES(res, STATUS.BAD_REQUEST, "Missing required fields.");
    }
    try {
        const Employee = await Employees.findOne({
            where: { firstName: createdBy }
        });
        if (!Employee) {
            return RES(res, STATUS.NOT_FOUND, "Employee not found.");
        }
        const Created = await Bug.create({
            title, description, createdBy,
        });
        return RES(res, STATUS.OK, "Bug created successfully.", Created);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const getbug = async (req, res) => {
    const bugId = req.params.bugId;
    try {
        const bug = await Bug.findOne({
            where: { id: bugId },
            include: [{
                model: Employees,
                attributes: ['id', 'firstName']
            }]
        });
        if (!bug) {
            return RES(res, STATUS.NOT_FOUND, "Bug not found.");
        }
        return RES(res, STATUS.OK, "Bug details fetched successfully.", bug);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

const DeleteBug = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return RES(res, STATUS.NOT_FOUND)
    }
    try {
        const find = await Bug.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await find.destroy()
        return RES(res, STATUS.OK, "Deleted Succesfully", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const UpdateBug = async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "INAVLID ID ")
        }
        const find = await Bug.findByPk(id)
        find.title = title
        find.description = description
        await find.save()
        return RES(res, STATUS.OK)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
module.exports = { CreateBug, getbug, DeleteBug, UpdateBug };




// const createBug = async (req, res) => {
//     const { title, description, createdBy, status } = req.body;

//     try {
//         // Check if the Employee exists
//         const employee = await Employees.findOne({
//             where: { firstName: createdBy }
//         });

//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found.' });
//         }

//         const bug = await Bug.create({
//             title,
//             description,
//             createdBy: employee.id,  // Assuming employee has an 'id' field
//             status
//         });

//         return res.status(201).json({ message: 'Bug created successfully', bug });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// {
//     "title": " Bug",
//         "description": "This is a  bug ",
//             "createdBy": "",
//                 "status": ""
// }
// controoer
// const createBug = async (req, res) => {
//     const { title, description, createdBy, status } = req.body;

//     try {
//         // Check if the Employee exists
//         const employee = await Employees.findOne({
//             where: { firstName: createdBy }
//         });

//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found.' });
//         }

//         const bug = await Bug.create({
//             title,
//             description,
//             createdBy: employee.id,  // Now, createdBy is the employee's ID
//             status
//         });

//         return res.status(201).json({ message: 'Bug created successfully', bug });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };


// const getBugDetails = async (req, res) => {
//     try {
//         const bug = await Bug.findByPk(req.params.bugId, {
//             include: [{
//                 model: Employee,
//                 as: 'creator',
//                 attributes: ['id', 'firstName', 'lastName']  // Specify the attributes you want
//             }]
//         });

//         if (!bug) {
//             return res.status(404).json({ message: 'Bug not found.' });
//         }

//         return res.status(200).json(bug);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };



// 
// const createBug = async (req, res) => {
//     const { title, description, status } = req.body;

//     // Assuming you have middleware that extracts the user from the JWT token
//     const user = req.user;

//     try {
//         const bug = await Bug.create({
//             title,
//             description,
//             createdBy: user.id,  // Automatically sets createdBy to the authenticated user's ID
//             status
//         });

//         return res.status(201).json({ message: 'Bug created successfully', bug });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// const getbug = async (req, res) => {
//     const bugId = req.params.bugId; // Assuming the bugId is passed as a URL parameter

//     try {
//         const bug = await Bug.findByPk(bugId);

//         if (!bug) {
//             return RES(res, STATUS.NOT_FOUND, "Bug not found.");
//         }

//         return RES(res, STATUS.OK, "Bug details fetched successfully", bug);

//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };
