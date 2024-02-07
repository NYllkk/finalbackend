const { STATUS, RES } = require("../../common/common");
const User = require("../../db/models/User");
const userValidator = require("../../validations/userValidator")
// const createUser = async (req, res) => {
//     try {
//         const { firstName, lastName, email } = req.body;
//         const user = await User.create({ firstName, lastName, email });
//         RES(res, STATUS.OK, 'User created successfully', user);
//     } catch (error) {
//         console.error(error);
//         RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
//     }
// };
// below one with validation
// const createUser = async (req, res) => {
//     const userdata = req.body
//     const validation = userValidator.validate(userdata)
//     if (validation.error) {
//         return RES(res, STATUS.BAD_REQUEST, validation.error.details[0].message);
//     }
//     try {
//         const user = await User.create(userdata)
//         return RES(res, STATUS.OK, 'User created successfully', user);

//     } catch (error) {
//         console.log(error)
//         RES(res, STATUS.INTERNAL_SERVER_ERROR)
//     }
// }
const createUser = async (req, res) => {
    const userdata = req.body;
    const validation = userValidator.validate(userdata);
    if (validation.error) {
        return res.status(STATUS.BAD_REQUEST).json({
            status: 'error',
            message: validation.error.details[0].message,
        });
    }
    try {
        const user = await User.create(userdata);
        return res.status(STATUS.OK).json({
            status: 'success',
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    const { UserId } = req.params;
    console.log(UserId)
    try {
        const user = await User.findByPk(UserId);
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, 'User not found');
        }
        await user.destroy();
        RES(res, STATUS.OK, 'User deleted successfully');
    } catch (error) {
        console.error(error);
        RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
};
const updateUser = async (req, res) => {
    const { UserId } = req.params
    const { firstName, lastName, email, } = req.body
    console.log(UserId)
    try {
        if (UserId) {
            const user = await User.findByPk(UserId);
            if (!user) {
                return RES(res, STATUS.NOT_FOUND, 'User not found');
            }
            console.log(user)
            const updated = await user.update({ firstName, lastName, email });
            RES(res, STATUS.OK, 'User updated successfully', updated);
        } else {
            RES(res, STATUS.NOT_FOUND, 'User ID not provided');
        }
    } catch (error) {
        console.error(error);
        RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
    }
};
const getUser = async (req, res) => {
    const { UserId } = req.params
    console.log(UserId)
    try {
        const user = await User.findByPk(UserId)
        console.log(user)
        if (!user) {
            return RES(res, STATUS.NOT_FOUND)
        }
        RES(res, STATUS.OK, "getting Student  ", user)

    } catch (error) {
        console.log(error)
        RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}


module.exports = { createUser, deleteUser, updateUser, getUser };

































// const express = require('express');
// const router = express.Router();
// const User = require("../db/models/User")
// router.post('/', async (req, res) => {
//     try {
//         let { firstName, lastName, email } = req.body
//         const users = await User.create({ firstName, lastName, email });
//         res.json(users);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: "internal Server error " })
//     }
// });

// router.delete("/:id", async (req, res) => {
//     const userId = req.params.id
//     try {
//         const user = await User.findByPk(userId)
//         if (!user) {
//             return res.status(404).json({ error: "user not found" })
//         }
//         user.destroy()
//         res.json({ message: "user Deleted Succsfully " })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: "Internl Server Error " })
//     }

// })

// module.exports = router;












// router.delete('/:id', async (req, res) => {
//     const userId = req.params.id;

//     try {
//         // Check if the user exists
//         const user = await User.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Delete the user
//         await user.destroy();

//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// routes.js
// const express = require("express");
// const { error } = require("../middleware/error");

// const app = express.Router();

// const adminRouter = require("../src/Admin/AdminRoute");
// const userRouter = require("../src/Users/UserRoute");


// src > folder named user with adminController.js admin routes







// WIILL Update
// const createUser = async (req, res) => {
//     try {
//         const { id, firstName, lastName, email } = req.body;

//         if (id) {
//             // If id is present, update the existing user
//             const user = await User.findByPk(id);
//             if (!user) {
//                 return RES(res, STATUS.NOT_FOUND, 'User not found');
//             }

//             await user.update({ firstName, lastName, email });
//             RES(res, STATUS.OK, 'User updated successfully', user);
//         } else {
//             // If id is not present, create a new user
//             const newUser = await User.create({ firstName, lastName, email });
//             RES(res, STATUS.OK, 'User created successfully', newUser);
//         }
//     } catch (error) {
//         console.error(error);
//         RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
//     }
// };


// validation 
// const userValidator = require('../validators/userValidator');
// const { RES, STATUS } = require('../../common/common');
// const UserModel = require('../../db/models/User');

// const createUser = async (req, res) => {
//     const userData = req.body;

//     const validation = userValidator.validate(userData);

//     if (validation.error) {
//         return RES(res, STATUS.BAD_REQUEST, validation.error.details[0].message);
//     }

//     try {
//         const user = await UserModel.create(userData);
//         return RES(res, STATUS.OK, 'User created successfully', user);
//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
//     }
// };

// // Other controller functions...

// module.exports = { createUser, /* other functions */ };


// final one 

// const updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { Title, Description, Priority } = req.body;

//     try {
//         if (!id) {
//             return RES(res, STATUS.NOT_FOUND, "ID NOT PROVIDED");
//         }

//         const note = await NoteModel.findByPk(id);
//         if (!note) {
//             return RES(res, STATUS.NOT_FOUND, "Note not found");
//         }

//         const updatedNote = await note.update({ Title, Description, Priority });
//         return RES(res, STATUS.OK, "Note updated successfully", updatedNote);

//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
//     }
// };

// module.exports = updateNote;
