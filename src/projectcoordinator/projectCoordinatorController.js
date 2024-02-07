const { RES, STATUS } = require("../../common/common");
const Project = require("../../db/models/ProjectCoordinator");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/helper.js")
const sendMail = require("../../common/sendMail/sendMail");
const { signupMail, forgotpass, } = require("../../common/emailTemplate");
const PasswordResetToken = require("../../db/models/PasswordResetToken");
const congrats = require("../../common/emailTemplate/congrats")


const CreatePC = async (req, res) => {
    const { name, email, password, role, department } = req.body;
    try {
        const exist = await Project.findOne({
            where: { email },
            attributes: { exclude: ['password'] }
        });
        if (exist) {
            return RES(res, STATUS.BAD_REQUEST, "Project Coordinator with this email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCoordinator = await Project.create({
            name,
            email,
            password: hashedPassword,
            role: 'ProjectCoordinator',
            department,
        });
        return RES(res, STATUS.OK, "Admin created successfully", newCoordinator);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const LoginPC = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return RES(res, STATUS.BAD_REQUEST, "INVALID CREDENTIALS");
        }
        const Coordinator = await Project.findOne({
            where: { email: email }
        });
        if (!Coordinator) {
            return RES(res, STATUS.NOT_FOUND, "INVALID EMAIL");
        }
        const isMatch = await bcrypt.compare(password, Coordinator.password);
        if (!isMatch) {
            return RES(res, STATUS.NOT_FOUND, "INVALID PASSWORD");
        }
        const tokenc = {
            id: Coordinator.id,
            email: Coordinator.email,
            role: "ProjectCoordinator"
        };
        const token = createToken(tokenc);
        await res.json({ token });
        return RES(res, STATUS.OK, "login Succesfull")
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
};
const forgotpasssword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Project.findOne({
            where: { email }
        });
        if (!user) {
            return RES(res, STATUS.NOT_FOUND);
        }
        const generateResetToken = createToken({
            userid: user.id,
            usermail: user.email
        });
        const url = `http://192.168.1.43:2000/resetpassword?token=${generateResetToken}`;
        const emailContent = {
            name: user.email,
            url: url
        };
        console.log(generateResetToken, "in generated token een ene en e")
        const { title, description } = forgotpass(emailContent);
        const info = await sendMail(user.email, title, description);
        console.log("Email sent:", info);
        await PasswordResetToken.create({
            userId: user.id,
            token: generateResetToken,
            expiresAt: new Date(Date.now() + 20 * 60 * 1000)
        });
        return RES(res, STATUS.OK, "send", info);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const verifytoken = async (req, res) => {
    const { token } = req.query;
    console.log(token, "here in token ")
    try {
        const resetToken = await PasswordResetToken.findOne({ where: { token } });
        if (!resetToken || resetToken.expiresAt < new Date()) {
            return RES(res, STATUS.BAD_REQUEST, 'Invalid or expired token');
        }
        const user = await Project.findOne({ where: { id: resetToken.userId } });
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, 'User not found');
        }
        return RES(res, STATUS.OK, 'Token verified', user);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const updatePassword = async (req, res) => {
    const { password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const resetToken = await PasswordResetToken.findOne({
            where: { token: req.query.token }
        });
        const user = await Project.findOne({ where: { id: resetToken.userId } });
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "NO USER FOUND ");
        }
        user.password = hashedPassword;
        const emailContent = {
            name: user.email,
        };
        const { title, description } = congrats(emailContent);
        const info = await sendMail(user.email, title, description);
        console.log("Email sent:", info);
        await PasswordResetToken.destroy({ where: { token: req.query.token } });
        await user.save();
        return RES(res, STATUS.OK, "Password updated successfully");
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
module.exports = { CreatePC, LoginPC, forgotpasssword, verifytoken, updatePassword };




// function generateRandomString(length) {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';

//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         result += characters[randomIndex];
//     }
// worked on Creating Ticket API 
//     return result;
// }

// // Example: Generate a random string of length 10
// const randomString = generateRandomString(10);
// console.log(randomString);





// const updatePassword = async (req, res) => {
//     const { password } = req.body;
//     try {
//         // Hash the New Password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Update Password in the Database
//         const resetToken = await PasswordResetToken.findOne({ where: { token: req.query.token } });
//         const user = await Project.findOne({ where: { id: resetToken.userId } });
//         if (user) {
//             user.password = hashedPassword;
//             await user.save();
//         }

//         // Invalidate Token
//         // Delete or mark the token as expired in the database

//         // Notify User
//         // Send an email or notification to the user that their password has been reset

//         return RES(res, STATUS.OK, 'Password updated successfully');
//     } catch (error) {
//         console.log(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };

// 

// const passport = require('passport');
// const jwt = require('jsonwebtoken');

// // In your authentication route handler (e.g., login route)
// router.post('/login', (req, res) => {
//     // Validate user credentials...
//     // If valid:
//     const token = jwt.sign({ userId: user.id, role: user.role }, 'your_secret_key');
//     res.json({ token });
// });

// // Middleware to decode and verify JWT
// const authenticate = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).send('Unauthorized: No token provided.');

//     jwt.verify(token, 'your_secret_key', (err, decoded) => {
//         if (err) return res.status(403).send('Forbidden: Invalid token.');
//         req.user = decoded;
//         next();
//     });
// };

// // Use the middleware in your route
// router.post('/create-pc', authenticate, isAdmin, (req, res) => {
//     // Create ProjectCoordinator instance and save to database...

//     res.status(201).send('Project Coordinator created successfully.');
// });




// const verifytoken = async (req, res) => {
//     const { token } = req.query; // Extract the token from the query parameters

//     try {
//         // Find the token in the database
//         const resetToken = await PasswordResetToken.findOne({ where: { token } });

//         if (!resetToken || resetToken.expiresAt < new Date()) {
//             return RES(res, STATUS.BAD_REQUEST, 'Invalid or expired token');
//         }

//         // Find the user associated with the token
//         const user = await Project.findOne({ where: { id: resetToken.userId } });

//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND, 'User not found');
//         }

//         // Display the password reset form on your website or application
//         // For example, redirect the user to a password reset page with the token in the URL
//         return RES(res, STATUS.OK, 'Token verified');
//     } catch (error) {
//         console.log(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };
// acc to this how to make route


// const verifytoken = async (req, res) => {
//     const { token } = req.query; // Extract the token from the query parameters

//     try {
//         // Find the token in the database
//         const resetToken = await PasswordResetToken.findOne({ where: { token } });

//         if (!resetToken || resetToken.expiresAt < new Date()) {
//             return RES(res, STATUS.BAD_REQUEST, 'Invalid or expired token');
//         }

//         // Redirect the user to the password reset page with the token in the URL
//         return res.redirect(`http://yourwebsite.com/reset-password?token=${token}`);
//     } catch (error) {
//         console.log(error);
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };
