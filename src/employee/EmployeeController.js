// http://192.168.1.9:2000/api/employee/login/update/:8
// http://192.168.1.9:2000/api/employee/signup
// http://192.168.1.9:2000/api/employee/login
// http://192.168.1.9:2000/api/employee/login/delete/:id
// http://192.168.1.9:2000/api/employee/login/getUser /
// http://192.168.1.63:2000/api//admin/login
// http://192.168.1.63:2000/api/employee/login/forgot
// blow one to chnage state 

// http://192.168.1.19:2000/api/employee/login/changeTaskState/1
// above is Created Routes
// below one is latest
// http://192.168.1.43:2000/api/employee/signup

const { STATUS, RES } = require("../../common/common")
const Employee = require("../../db/models/Employee")
const bcrypt = require("bcrypt");
require("dotenv").config()
const jwt = require("jsonwebtoken")
const createToken = require("../../utils/helper");
const PasswordResetToken = require("../../db/models/PasswordResetToken")
const emailTemplate = require("../../common/emailTemplate");
const sendMail = require("../../common/sendMail/sendMail");
const formidable = require("formidable");
// const { signupMail } = require("../../common/emailTemplate/confirmEmail");
// const { createToken, convertArrayValuesToSingle } = require("../../utils/helper")
const { processFormFields } = require("../../utils/helper.js")
const { forgotPasswordMail } = require("../../common/emailTemplate/forgetPassword")
const Task = require("../../db/models/Task");
const { uploadImage, deleteImage, upadteimage } = require("../../common/upload/uploadFile");

const AuthSignup = async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user) {
            console.log("User is authenticated");
            const googleUser = req.user;
            const existingEmployee = await Employee.findOne({ where: { googleId: googleUser.googleId } });
            if (!existingEmployee) {
                const newEmployee = await Employee.create({
                    googleId: googleUser.googleId,
                    displayName: googleUser.displayName,
                });
                console.log("User signed up successfully");
                return RES(res, STATUS.OK, "CREATED", newEmployee);
            } else {
                console.log("User already exists");
                return RES(res, STATUS.OK, "User already exists", existingEmployee);
            }
        } else {
            console.log("User not authenticated");
            return RES(res, STATUS.UNAUTHORIZED, "Unauthorized");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error during signup");
    }
};

const Signup = async (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        const returndata = await new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    return reject(new Error("Error parsing form data"));
                }
                const processedFields = processFormFields(fields);
                const { firstName, email, lastName, password } = processedFields;
                const hashedPassword = await bcrypt.hash(password, 10)
                let profilePictureUrl = "";
                if (files.profilePicture) {
                    const imagePath = files.profilePicture.path;
                    const public_id = await uploadImage(imagePath);
                    profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
                }
                const employeeDetail = await Employee.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    profilePicture: profilePictureUrl
                });
                return resolve(employeeDetail);
            });
        });
        console.log(returndata, "in return data");
        return RES(res, STATUS.OK, "CREATED", returndata);
    } catch (error) {
        console.error("Error during signup:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error during signup");
    }
};




// this is my normal signup 

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Employee.findOne({
            where: { email },
            attributes: ["id", "password"]
        })
        console.log(user, "in here in login ")
        if (!user) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const matchpassword = await bcrypt.compare(password, user.password)
        if (!matchpassword) {
            return RES(res, STATUS.UNAUTHORIZED, "Invalid Credentials")
        }
        const token = createToken({
            userId: user.id,
            email: user.email,
            role: "EMPLOYEE"
        })
        // shiiswiift@yopmail.com
        // shiiiift@yopmail.com
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decodedToken, "in here with decode ")
            if (decodedToken.userId !== user.id) {
                return RES(res, STATUS.UNAUTHORIZED, "USER ID AND TOKEN ISNT MATCHING")
            }
        } catch (error) {
            console.error("JWT Verification Error:", verificationError);
            return RES(res, STATUS.UNAUTHORIZED, "Invalid Token");
        }
        return RES(res, STATUS.OK, "USER LOGGED IN SUCCESFULLY ", { token })
    } catch (error) {
        console.log(error)
        RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, newpassword, profilePicture } = req.body;
        const user = await Employee.findByPk(userId);
        if (!user) {
            return RES(res, STATUS.NOT_FOUND);
        }
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        if (newpassword) {
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            user.password = hashedPassword;
        }
        if (req.file) {
            const imagePath = req.file.path;
            const public_id = await uploadImage(imagePath);
            user.profilePicture = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
        }
        await user.save();
        return RES(res, STATUS.OK, {
            updatedUser: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                profilePicture: user.profilePicture,
            }
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error updating user");
    }
};
const deleteUser = async (req, res) => {
    const { userId } = req.params
    console.log(userId, "in user id ")
    try {
        const user = await Employee.findByPk(userId)
        console.log(user)
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "USER NOT FOUND")
        }
        await user.destroy()
        return RES(res, STATUS.OK, "user deleted Succesfull")
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const forgotpasssword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Employee.findOne({ where: { email } });
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, 'User not found');
        }
        const resetToken = createToken({
            userId: user.id,
            userEmail: user.email,
        });
        const resetUrl = `https://sequelize.org/docs/v6/other-topics/migrations/?token=${resetToken}`
        await PasswordResetToken.create({
            userId: user.id,
            token: resetToken,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });
        let messageContent = {
            name: user.email,
            url: resetUrl
        };
        let emailContent = forgotPasswordMail(messageContent);
        console.log(emailContent, "in email content ")
        try {
            const info = await sendMail(user.email, "Password Reset Token", emailContent);
            console.log("Email sent:", info);
            return RES(res, STATUS.OK, "RESET PASSWORD MAIL SEND SUCCESFULLY ")
        } catch (error) {
            console.error("Error sending email:", error);
            return RES(STATUS.INTERNAL_SERVER_ERROR, "ERROR IN SENDING MAIL ")
        }
    } catch (error) {
        console.error(error);
        return RES(STATUS.INTERNAL_SERVER_ERROR)
    }
};
const getUser = async (req, res) => {
    const { userId } = req.params
    try {
        const user = await Employee.findByPk(userId)
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "NO USER FOUND ")
        }
        return RES(res, STATUS.OK, "USER FOUND ", user)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const getEmployeeTasks = async (req, res) => {
    const { userId } = req.params;
    try {
        const tasks = await Task.findAll({
            where: {
                EmployeeId: userId,
            },
        });
        return RES(res, STATUS.OK, "GOT THE TASK  tasks", tasks);
    } catch (error) {
        console.error("ERROR", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}

const ChnageState = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return RES(res, STATUS.NOT_FOUND, "TASK NOT FOUND ");
        }
        // http://192.168.1.19:2000/api/employee/login/changeTaskState/3 
        const employeeIdFromRequest = req.body.employeeId;
        if (!employeeIdFromRequest) {
            return RES(res, STATUS.BAD_REQUEST, "EMPLOYEE ID IS REQUIRED OR INVALID");
        }
        if (task.EmployeeId !== parseInt(employeeIdFromRequest)) {
            return RES(res, STATUS.FORBIDDEN, "CANNTOT CHANGE NOT AUTHORIZED ");
        }
        const { state } = req.body;
        if (['pending', 'in-progress', 'completed'].includes(state)) {
            task.state = state;
            if (state === 'in-progress') {
                const currentTime = new Date().toLocaleTimeString();
                task.stateChangeTimestamp = currentTime;
                console.log(currentTime, "here in stateChange");
            } else {
                task.stateChangeTimestamp == null
            }
            await task.save();
            return RES(res, STATUS.OK, "Task state updated successfully", task);
        } else {
            return RES(res, STATUS.BAD_REQUEST, "Invalid task state");
        }
    } catch (error) {
        console.error("Error changing task state:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const deleteUserProfilePicture = async (req, res) => {
    const { userId } = req.params;
    console.log(userId, "in user id for deleting profile picture");
    try {
        const user = await Employee.findByPk(userId);
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "User not found");
        }
        if (!user.profilePicture) {
            return RES(res, STATUS.NOT_FOUND, "User does not have a profile picture");
        }
        const publicIdMatch = user.profilePicture.match(/\/image\/upload\/(.+)$/);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if (publicId) {
            await deleteImage(res, publicId);
            user.profilePicture = "";
            await user.save();
        }
        return RES(res, STATUS.OK, "Profile picture deleted successfully");
    } catch (error) {
        console.error("Error deleting profile picture:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error deleting profile picture");
    }
};
const updateImageCl = async (req, res) => {
    const { id } = req.params;
    const { profilePictureUrl } = req.body;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "User ID is required");
        }
        const user = await Employee.findByPk(id);
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "User not found");
        }
        if (user.profilePicture) {
            const publicIdMatch = user.profilePicture.match(/\/image\/upload\/(.+)$/);
            const publicId = publicIdMatch ? publicIdMatch[1] : null;
            console.log(publicId, "here in public id ");
            if (publicId) {
                const imagePath = `media-explorer/updatedimage`;
                await upadteimage(res, publicId, imagePath);
            }
        } else {
            user.profilePicture = profilePictureUrl;
            await user.save();
            return RES(res, STATUS.OK, "Profile picture updated successfully", profilePictureUrl);
        }
    } catch (error) {
        console.error("Error updating profile picture:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error updating profile picture");
    }
};
const render = (req, res) => {
    res.render('render', { message: "hihihihhihih" });
}
const payment = (req, res) => {
    res.render('payment', { message: "in paymnent " });
}
const dontrender = (req, res) => {
    res.render('dontrender', { message: "don't render" });
}

module.exports = { Signup, login, updateUser, deleteUser, forgotpasssword, getUser, getEmployeeTasks, ChnageState, deleteUserProfilePicture, updateImageCl, AuthSignup, render, dontrender, payment }
// http://192.168.1.66:2000/api/employee/delete/6





// authentication by google 
// use existing user data
//   //  the employee data from the Google authentication
// profile in googleUser to update or create the employee record.
// if existing then have to craete new record 

// const Signup = async (req, res) => {
//     try {
//    ....    
//         if (req.isAuthenticated() && req.user) {
//    ...
//             const googleUser = req.user;

//           \.......
//            /.......
//             const existingEmployee = await Employee.findOne({ where: { googleId: googleUser.googleId } });

//             if (!existingEmployee) {
//                 ?...........
//                 const newEmployee = await Employee.create({
//                     googleId: googleUser.googleId,
//                     displayName: googleUser.displayName,
//                     // ... other user data from the Google profile
//                 });

//                 return RES(res, STATUS.OK, "CREATED", newEmployee);
//             }

//            
//             return RES(res, STATUS.OK, "EXISTING_EMPLOYEE", existingEmployee);
//         }

// non google signup ....../..
//         // ...

//         return RES(res, STATUS.OK, "CREATED", returndata);
//     } catch (error) {
//         console.error("Error during signup:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error during signup");
//     }
// };




// ...................






// email c
// let messageContent = {
//     name: user.email,
//     description: "Your reset token is: " + resetToken 
// };

// let emailContent = signupMail(messageContent);

// try {
//     const info = await sendMail(user.email, "Password Reset Token", emailContent);
//     console.log("Email sent:", info);
// } catch (error) {
//     console.error("Error sending email:", error);
// }












// for updating profile picture 
// const updateProfilePicture = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { profilePicture } = req.body;

//         // Validate input data
//         if (!profilePicture || !profilePicture.trim()) {
//             return RES(res, STATUS.BAD_REQUEST, 'Profile picture is required.');
//         }

//         const user = await Employee.findByPk(userId);

//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND, 'User not found.');
//         }

//         // Update profilePicture field
//         user.profilePicture = profilePicture;

//         await user.save();

//         return RES(res, STATUS.OK, {
//             updatedUser: {
//                 id: user.id,
//                 profilePicture: user.profilePicture,
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, 'An error occurred.');
//     }
// };

// module.exports = updateProfilePicture;










// today 
// let messageContent = {
//     name: user.email,  
//     url: resetUrl  
// };

// let emailContent = emailTemplates.forgotPasswordMail(messageContent);

// try {
//     const info = await sendMail(user.email, "Reset Your Password", emailContent.description);
//     console.log("Email sent:", info);
// } catch (error) {
//     console.error("Error sending email:", error);
// }






// old one 

// below one is trying
// try {
//     await sendMail(email, msg.title, msg.name)
//     data = { email: user.email, token };
// } catch (error) {
//     console.log(error)
//     return RES(res, STATUS.INTERNAL_SERVER_ERROR)
// }
// upper one is trying


// below one is working
// let emailTemplate = signupMail({ description: "waoooooo" })
// let msgDescription = signupMail({ title: "uwieidgd" })
// try {
//     let msgTitle = " Email Title";
//     let msgDescription = " Email Description";
//     await sendMail(email, msgTitle, emailTemplate);
// } catch (error) {
//     console.log(error);
//     return RES(res, STATUS.INTERNAL_SERVER_ERROR);
// }
// return RES(res, STATUS.OK, "Password reset initiated successfully");
// email









// 
// const ChnageState = async (req, res) => {
//     const { taskId } = req.params;
//     try {
//         const task = await Task.findByPk(taskId);
//         if (!task) {
//             return RES(res, STATUS.NOT_FOUND, "TASK NOT FOUND");
//         }

//         const employeeIdFromRequest = req.body.employeeId;
//         if (!employeeIdFromRequest) {
//             return RES(res, STATUS.BAD_REQUEST, "EMPLOYEE ID IS REQUIRED OR INVALID");
//         }

//         if (task.EmployeeId !== parseInt(employeeIdFromRequest)) {
//             return RES(res, STATUS.FORBIDDEN, "CANNOT CHANGE: NOT AUTHORIZED");
//         }

//         const { state } = req.body;
//         if (['pending', 'in-progress', 'completed'].includes(state)) {
//             task.state = state;

//             // Update the stateChangeTimestamp only if the state is changing to 'in-progress'
//             if (state === 'in-progress') {
//                 task.stateChangeTimestamp = new Date(); // Set the current date and time
//             }
//             await task.save();
//             return RES(res, STATUS.OK, "Task state updated successfully", task);
//         } else {
//             return RES(res, STATUS.BAD_REQUEST, "Invalid task state");
//         }
//     } catch (error) {
//         console.error("Error changing task state:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// }





// with the clouddinary 
// const Signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, profilePicture } = req.body;
//         const existingUser = await Employee.findOne({
//             where: { email },
//             attributes: { exclude: ['password'] }
//         });
//         if (existingUser) {
//             return RES(res, STATUS.BAD_REQUEST, "User with this email already exists");
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         let profilePictureUrl = "";
//         if (req.file) {
//             const imagePath = req.file.path;
//             const public_id = await uploadImage(imagePath);
//             profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
//         }
//         const employeeDetail = await Employee.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             profilePicture: profilePictureUrl
//         });
//         return RES(res, STATUS.OK, "User created successfully", employeeDetail);
//     } catch (error) {
//         console.error("Error during signup:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error during signup");
//     }
// };



// cloudinary image upate 

// const updateUser = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { firstName, lastName, email, newpassword } = req.body;
//         const user = await Employee.findByPk(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         // Update user details
//         user.firstName = firstName || user.firstName;
//         user.lastName = lastName || user.lastName;
//         user.email = email || user.email;

//         // Update password if new password is provided
//         if (newpassword) {
//             const hashedPassword = await bcrypt.hash(newpassword, 10);
//             user.password = hashedPassword;
//         }
//         // Update profile picture if file is uploaded
//         if (req.file) {
//             const imagePath = req.file.path;
//             const public_id = await uploadImage(imagePath);
//             user.profilePicture = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
//         }
//         // Save updated user details
//         await user.save();

//         // Return response
//         return res.status(200).json({
//             message: "User updated successfully",
//             updatedUser: {
//                 id: user.id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 profilePicture: user.profilePicture
//             }
//         });
//     } catch (error) {
//         console.error("Error during user update:", error);
//         return res.status(500).json({ message: "Error during user update" });
//     }
// };



// const uploadNewProfilePicture = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await Employee.findByPk(userId);

//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND);
//         }

//         if (req.file) {
//             const imagePath = req.file.path;
//             const public_id = await uploadImage(imagePath); // Upload to Cloudinary
//             user.profilePicture = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`; // Update profile picture URL
//         }

//         await user.save();

//         return RES(res, STATUS.OK, {
//             updatedUser: {
//                 id: user.id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 email: user.email,
//                 profilePicture: user.profilePicture,
//             }
//         });

//     } catch (error) {
//         console.error("Error updating profile picture:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error updating profile picture");
//     }
// };

// router.post("/employee/:userId/profile-picture", upload.single('profilePicture'), uploadNewProfilePicture);










// 
// 
// 
// 
// shiiswiiftt @yopmail.com
// shiiiiftt @yopmail.com

// const Signup = async (req, res) => {
//     try {
//         const { firstName, lastName, email, password, profilePicture } = req.body;
//         console.log(firstName, "here in first Name ")
//         const existingUser = await Employee.findOne({
//             where: { email },
//             attributes: { exclude: ['password'] }
//         });
//         console.log(existingUser), "here in existingUser"
//         console.log(req.body, "here in body ")
//         if (existingUser) {
//             return RES(res, STATUS.BAD_REQUEST, "User with this email already exists");
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // with cloudinary 
//         // const form = new formidable.IncomingForm()
//         let profilePictureUrl = "";
//         if (req.file) {
//             const imagePath = req.file.path;
//             const public_id = await uploadImage(imagePath);
//             profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
//         }
//         const employeeDetail = await Employee.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             profilePicture: profilePictureUrl
//         });
//         return RES(res, STATUS.OK, "User created successfully", employeeDetail);
//         // // with cloudinary 
//     } catch (error) {
//         console.error("Error during signup:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error during signup");
//     }
// };

// let processFormFields = (arr) => {
//     let processedFields = {};
//     for (const [key, value] of Object.entries(arr)) {
//         processedFields[key] = Array.isArray(value) ? value[0] : value;
//     }
//     return processedFields;
// };
// if the duration already made then have to restart 
// and get the last duartion time 
// 
// / const Signup = async (req, res) => {
//     try {
//    ....    
//         if (req.isAuthenticated() && req.user) {
//    ...
//             const googleUser = req.user;

//           \.......
//            /.......
//             const existingEmployee = await Employee.findOne({ where: { googleId: googleUser.googleId } });

//             if (!existingEmployee) {
//                 ?...........
//                 const newEmployee = await Employee.create({
//                     googleId: googleUser.googleId,
//                     displayName: googleUser.displayName,
//                     // ... other user data from the Google profile
//                 });

//                 return RES(res, STATUS.OK, "CREATED", newEmployee);
//             }

//            
//             return RES(res, STATUS.OK, "EXISTING_EMPLOYEE", existingEmployee);
//         }

// non google signup ....../..
//         // ...

//         return RES(res, STATUS.OK, "CREATED", returndata);
//     } catch (error) {
//         console.error("Error during signup:", error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error during signup");
//     }
// };