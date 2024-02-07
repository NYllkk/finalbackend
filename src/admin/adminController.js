const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { RES, STATUS } = require("../../common/common");
const createToken = require("../../utils/helper");
const Admin = require("../../db/models/Admin");
const PasswordResetToken = require("../../db/models/PasswordResetToken");
const { forgotPasswordMail } = require("../../common/emailTemplate/forgetPassword")
const sendMail = require("../../common/sendMail/sendMail")
const forgototp = require("../../common/emailTemplate/forgototp")
const Task = require("../../db/models/Task")
dotenv.config();
const AdminOTP = require("../../db/models/AdminOTP");
const Employees = require("../../db/models/Employee");
const Leave = require("../../db/models/Leave");
const Bug = require("../../db/models/Bug");
const Training = require("../../db/models/Training");
const ProjectCoordinator = require("../../db/models/ProjectCoordinator");
const Ticket = require("../../db/models/Ticket");
const Project = require("../../db/models/Projects");
const Dsr = require("../../db/models/Dsr");
const TimeEntry = require("../../db/models/TimeEntry");
const sendingdata = require("../../common/emailTemplate/sendingdata")

const registerAdmin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const existingAdmin = await Admin.findOne({
            where: { email },
            attributes: { exclude: ['password'] }
        });
        if (existingAdmin) {
            return RES(res, STATUS.BAD_REQUEST, "Admin with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "ADMIN"
        });
        return RES(res, STATUS.OK, "Admin created successfully", newAdmin);
    } catch (error) {
        console.error("Error registering admin:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return RES(res, STATUS.BAD_REQUEST, "Enter valid credentials");
        }
        const admin = await Admin.findOne({ where: { email: email.toLowerCase() } });
        if (!admin) {
            return RES(res, STATUS.NOT_FOUND, "Email not found");
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return RES(res, STATUS.UNAUTHORIZED, "Invalid password");
        }
        const tokenc = {
            id: admin.id,
            email: admin.email,
            role: "ADMIN"
        };
        const token = createToken(tokenc);
        res.json({ token });
        console.log("token in mkkiddleware", token)
    } catch (error) {
        console.error("Admin login error:", error);
        RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
};
// me  generating token here 
const updateadmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { email, password } = req.body;
        const admin = await Admin.findByPk(adminId);
        console.log(admin, "in the admin update email");
        if (!admin) {
            return RES(res, STATUS.NOT_FOUND, 'ADMIN NOT FOUND', admin);
        }
        if (email && email.toLowerCase() !== admin.email) {
            const existingAdmin = await Admin.findOne({
                where: { email: email.toLowerCase() },
                attributes: { exclude: ['password'] }
            });
            if (existingAdmin) {
                return RES(res, STATUS.BAD_GATEWAY, "EMAIL IS ALREADY TAKEN ");
            }
            admin.email = email.toLowerCase();
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            admin.password = hashedPassword;
        }
        await admin.save();
        return RES(res, STATUS.OK, "Admin updated successfully", admin);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const deletadmin = async (req, res) => {
    try {
        const { userId } = req.params
        const admin = await Admin.findByPk(userId)
        if (!userId) {
            return RES(res, STATUS.NOT_FOUND, "NO ADMIN IS EXISTED")
        }
        await admin.destroy()
        return RES(res, STATUS.OK,
            "DELETED SUCCESFULLY ")
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const getAdmin = async (req, res) => {
    const { userId } = req.params
    try {
        const admin = await Admin.findByPk(userId)
        if (!admin) {
            return RES(res, STATUS.NOT_FOUND, "NO ADMIN FOUND ")
        }
        return RES(res, STATUS.OK, "ADMIN FOUND", admin)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const forgotpasssword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Admin.findOne({ where: { email } });
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, 'User not found');
        }
        const otp = generateOTP();
        const emailContent = {
            name: user.email,
            otp
        };
        const { title, description } = forgototp(emailContent);
        await AdminOTP.create({
            adminId: user.id,
            otp: otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        const resetToken = createToken({
            userId: user.id,
            userEmail: user.email,
        });
        const info = await sendMail(user.email, title, description);
        console.log("Email send in admin controller :", info);
        await PasswordResetToken.create({
            userId: user.id,
            token: resetToken,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });
        return RES(res, STATUS.OK, "OTP IS SENT SUCCESSFULLY", PasswordResetToken);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const verifyOtp = async (req, res) => {
    const { adminId } = req.params;
    const { otp } = req.body;
    console.log(" have  adminId:", adminId);
    console.log("have OTP:", otp);
    try {
        const adminOTPRecord = await AdminOTP.findByPk(adminId);
        console.log(" in otp record ", adminOTPRecord);
        if (!adminOTPRecord || adminOTPRecord.otp !== otp) {
            console.log("invalid otp");
            return RES(res, STATUS.BAD_REQUEST, "otp is invalid");
        }
        if (new Date() > adminOTPRecord.expiresAt) {
            console.log("OTP has expired.");
            return RES(res, STATUS.BAD_REQUEST, "OTP has expired");
        }
        console.log("OTP is verified successfully.");
        return RES(res, STATUS.OK, "OTP IS VERIFIED SUCCESSFULLY");
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
}
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return RES(res, STATUS.NOT_FOUND, 'Admin not found');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        await admin.save();
        return RES(res, STATUS.OK, "Password reset successfully");
    } catch (error) {
        console.error("Error in resetting password:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const assignTask = async (req, res) => {
    try {
        const { title, description, dueDate, EmployeeId, state, dueTime } = req.body;
        const employee = await Employees.findByPk(EmployeeId);
        console.log(employee, "in employee here here ")
        if (!employee) {
            return RES(res, STATUS.NOT_FOUND, "Employee not found");
        }
        const task = await Task.create({
            title,
            description,
            dueDate,
            dueTime,
            state: state || 'pending',
            EmployeeId,
        });
        return RES(res, STATUS.OK, "Task assigned successfully", task);
    } catch (error) {
        console.error("Error assigning task:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const Deletetask = async (req, res) => {
    const { taskId } = req.params
    try {
        const task = await Task.findByPk(taskId)
        if (!task) {
            return RES(res, STATUS.NOT_FOUND, "TASK NOT FOUND ")
        }
        await task.destroy()
        return RES(res, STATUS.OK, "TASK DELETED SUCCCESFULLY ")
    } catch (error) {
        console.log(error)
        RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const getEmployeeLeaves = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return RES(res, STATUS.NOT_FOUND);
    }
    // if (!req.user || req.user.role !== 'admin') {
    //     return RES(res, STATUS.UNAUTHORIZED, "ONLY ACCESSED BY ADMIN");
    // }
    try {
        const leaves = await Leave.findAll({
            where: {
                EmployeeId: id
            }
        });
        return RES(res, STATUS.OK, "FOUND LEAVES", leaves);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const changeLeaveReview = async (req, res) => {
    const { id } = req.params;
    const { LeaveReview } = req.body;
    try {
        if (!id || !LeaveReview) {
            return RES(res, STATUS.BAD_REQUEST, "INAVLID REQ PARAMS");
        }
        const leave = await Leave.findByPk(id);
        if (!leave) {
            return RES(res, STATUS.NOT_FOUND, "LEAVE NOT FOUND");
        }
        leave.LeaveReview = LeaveReview;
        await leave.save();
        return RES(res, STATUS.OK, "Leave REVIEW UPDATED");
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const chnageBugstatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const find = await Bug.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        find.status = status
        await find.save()
        return RES(res, STATUS.OK, "CHANGED SUCCESFULLY", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updateTrainingStatus = async (req, res) => {
    try {
        const { trainingId } = req.params;
        const { status } = req.body;
        const training = await Training.findByPk(trainingId);
        if (!training) {
            return RES(res, STATUS.NOT_FOUND, "Training not found");
        }
        training.status = status;
        await training.save();
        return RES(res, STATUS.OK, "Training status updated successfully", training);
    } catch (error) {
        console.error("Error updating training status:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}
const DeletePC = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const PC = await ProjectCoordinator.findByPk(id)
        if (!PC) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await PC.destroy()
        return RES(res, STATUS.OK, "PROJECT COORDINATOR DELETED SUCCESFULLY")
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const updatePC = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "ID NOT FOUND OR WRONG");
        }
        let user = await ProjectCoordinator.findByPk(id);
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "USER NOT FOUND");
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        return RES(res, STATUS.OK, "USER DETAILS UPDATED SUCCESSFULLY");
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "INTERNAL SERVER ERROR");
    }
};
const changeticket = async (req, res) => {
    const { id } = req.params
    const { state } = req.body
    try {
        const find = await Ticket.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        find.state = state
        await find.save()
        return RES(res, STATUS.OK)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND, "ID NOT FOUND")
        }
        const find = await Project.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        } await find.destroy()
        return RES(res, STATUS.OK, "DELETED SUCCESFULL", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const DeleteDsr = async (req, res) => {
    console.log("error")
    const { id } = req.params
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const find = await Dsr.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await find.destroy()
        return RES(res, STATUS.OK, "OK", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
// ({ order: [['id', 'DESC']] });
// order: [['id', 'ASC']] });


const punchInDetail = async (req, res) => {
    const id = req.params
    if (!id) {
        return RES(res, STATUS.NOT_FOUND)
    }
    try {
        const find = await TimeEntry.findOne(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        console.log(find, "here in find ")
        const emailContent = {
            name: find.punchType,
            id: find.EmployeeId
        }
        const { title, description } = sendingdata(emailContent)
        const info = await sendMail(find.punchType, title, description);
        return RES(res, STATUS.OK, "got ", find, info)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}


// const emailContent = {
//     name: user.email,
//     otp
// };
// const { title, description } = forgototp(emailContent);
// await AdminOTP.create({
//     adminId: user.id,
//     otp: otp,
//     expiresAt: new Date(Date.now() + 5 * 60 * 1000)
// });
// const resetToken = createToken({
//     userId: user.id,
//     userEmail: user.email,
// });
// const info = await sendMail(user.email, title, description);
// console.log("Email sentyjnynmymn yj:", info);
// await PasswordResetToken.create({
//     userId: user.id,
//     token: resetToken,
//     expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
// });
module.exports = {
    registerAdmin, adminLogin, updateadmin, deletadmin, getAdmin, forgotpasssword, verifyOtp, resetPassword, assignTask, Deletetask, getEmployeeLeaves, changeLeaveReview, chnageBugstatus, updateTrainingStatus, DeletePC, updatePC, changeticket, deleteProject, DeleteDsr, punchInDetail
}
// have to pass admin middleware and then have to make other midddlewares too




// const adminOTPRecord = await AdminOTP.findOne({ where: { adminId } });
// console.log(" in otp record ", adminOTPRecord);


// Title	Description	Project	Created By	Build Type	Build Date

//  for dsr
// Employee Name	Projects	Total Items	Total Hours	Created At
// create sequelize model for this 
// // 

















// const jwt = require('jsonwebtoken');

// const protectRoute = (req, res, next) => {
//     // Extract the token from the request header
//     const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is passed in the "Authorization" header
// worked on Admin  Authentication API & generate OTP API and Upload ProfilePicture in Employee Api 
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming you're using JWT for authentication
//         req.admin = decoded; // Attach the decoded token to the request object

//         // Check if the user is an admin
//         if (req.admin.role !== 'ADMIN') {
//             return res.status(403).json({ message: 'Access forbidden. Admin role required.' });
//         }

//         next(); // Move to the next middleware or route handler
//     } catch (error) {
//         console.error('Token verification error:', error);
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };























// for otp


// const forgotpasssword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await Employee.findOne({ where: { email } });

//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND, 'User not found');
//         }

//         // Generate OTP
//         const otp = generateOTP();

//         // (Optional) Store OTP in the database or another secure mechanism if needed

//         // Prepare email content
//         let messageContent = {
//             name: user.email,
//             otp: otp  // Include the OTP in the email content
//         };

//         let emailContent = forgotPasswordMail(messageContent);  // Use your email template function

//         // Send the email
//         try {
//             const info = await sendMail(user.email, "Your OTP", emailContent.description);
//             console.log("Email sent:", info);
//         } catch (error) {
//             console.error("Error sending email:", error);
//             RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error sending email");
//             return;
//         }

//         // Continue with your existing code...
//         const resetToken = createToken({
//             userId: user.id,
//             userEmail: user.email,
//         });
//         await PasswordResetToken.create({
//             userId: user.id,
//             token: resetToken,
//             expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
//         });

//         RES(res, STATUS.SUCCESS, 'OTP sent successfully');

//     } catch (error) {
//         console.log(error);
//         RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };










// // ... 

// const forgotPasswordMail = (messageContent) => {
//     return {
//         description: `
//             <h1>Hello ${messageContent.name}</h1>
//             <p>Your OTP is: ${messageContent.otp}</p>
//             <p>Please use this OTP to reset your password.</p>
//         `
//     };
// };

// const forgotpasssword = async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await Admin.findOne({ where: { email } });
//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND, 'User not found');
//         }
//         const otp = generateOTP();
//         let messageContent = {
//             name: user.email,
//             otp: otp
//         };
//         const resetToken = createToken({
//             userId: user.id,
//             userEmail: user.email,
//         });
//         let emailContent = forgotPasswordMail(messageContent);
//         console.log(emailContent);  // Log the email content
//         try {
//             const info = await sendMail(user.email, "Your OTP", emailContent.description);
//             console.log("Email sent:", info);
//         } catch (error) {
//             console.error("Error sending email:", error);
//             RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error sending email");
//             return;
//         }
//         // ... rest of the code
//     } catch (error) {
//         console.log(error);
//         RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };

// // ... other code



// wnkckncknck
















// 4uhfu3ug3fdug3efuegfugefugeufuefugeufeejfghegfhegfrgfygyrfgyrgfyegfygyfgyefgyegyegfeyw
// npm install passport passport - local bcrypt

// const passport = require('passport');
// app.use(passport.initialize());

// local strategy
// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const Admin = require('./models/Admin'); // Adjust the path accordingly

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email, password, done) => {
//     try {
//         const admin = await Admin.findOne({ where: { email } });
//         if (!admin) return done(null, false, { message: 'Invalid email or password' });

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) return done(null, false, { message: 'Invalid email or password' });

//         return done(null, admin);
//     } catch (error) {
//         return done(error);
//     }
// }));
//   
// in controller 
// const registerAdmin = async (req, res, next) => {
//     // ... [rest of the function]

//     passport.authenticate('local', (err, admin, info) => {
//         if (err) return next(err);
//         if (!admin) return RES(res, STATUS.UNAUTHORIZED, info.message); // Unauthorized

//         // If authentication is successful, login the admin and return response
//         req.logIn(admin, (err) => {
//             if (err) return next(err);
//             return RES(res, STATUS.OK, "Admin registered and logged in successfully", admin);
//         });
//     })(req, res, next);
// }

// serialize deserialize 
// passport.serializeUser((admin, done) => {
//     done(null, admin.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const admin = await Admin.findByPk(id);
//         if (!admin) return done(new Error('Admin not found'));
//         done(null, admin);
//     } catch (error) {
//         done(error);
//     }
// });
// in the route 
// router.post("/signup", registerAdmin);


// const updateLeaveReview = async (req, res) => {
//     const { id } = req.params;
//     const { reviewStatus } = req.body;

//     // Check if an ID and review status are provided
//     if (!id || !reviewStatus) {
//         return RES(res, STATUS.BAD_REQUEST, "Invalid request parameters");
//     }

//     // Ensure only an admin can update the review status (modify this based on your authentication mechanism)
//     if (!req.user || req.user.role !== 'admin') {
//         return RES(res, STATUS.UNAUTHORIZED, "Only admins can update leave review status");
//     }

//     try {
//         // Update the review status for the leave with the provided ID
//         const leave = await Leave.findByPk(id);

//         if (!leave) {
//             return RES(res, STATUS.NOT_FOUND, "Leave not found");
//         }

//         leave.reviewStatus = reviewStatus;
//         await leave.save();

//         return RES(res, STATUS.OK, "Leave review status updated", leave);

//     } catch (error) {
//         console.log(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// }
