
// const nodemailer = require('nodemailer');

// const sendResetEmail = async (userEmail, resetToken) => {
//     const transporter = nodemailer.createTransport({
//         service: 'yopmail',
//         auth: {
//             user: 'nikhil@yopmail',
//             pass: 'nikhil@123',
//         },
//     });
//     const mailOptions = {
//         from: from,
//         to: to,
//         subject: 'Password Reset',
//         text: `Click the following link to reset your password: https://192.168.1.9:3000/api/employee/resetpassword?token=${resetToken}`,
//     };
//     // worked on Creating 
//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ', info);
//     } catch (error) {
//         console.error('Error sending email: ', error);
//     }
// };

// module.exports = { sendResetEmail };







// // 
// // const bcrypt = require("bcrypt");
// // const { RES, STATUS } = require("../../common/common");
// // const createToken = require("../../utils/helper");
// // const Admin = require("../../db/models/Admin");

// // const adminLogin = async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         if (!email || !password) {
// //             return RES(res, STATUS.BAD_REQUEST, "Enter valid credentials");
// //         }

// //         // Fetch admin by email
// //         const admin = await Admin.findOne({ where: { email: email.toLowerCase() } });

// //         if (!admin) {
// //             return RES(res, STATUS.NOT_FOUND, "Email not found");
// //         }

// //         // Compare the provided password with the hashed password from the database
// //         const isMatch = await bcrypt.compare(password, admin.password);

// //         if (!isMatch) {
// //             return RES(res, STATUS.UNAUTHORIZED, "Invalid password");
// //         }

// //         const tokenPayload = {
// //             id: admin.id,
// //             email: admin.email,
// //             role: "ADMIN"
// //         };

// //         const token = createToken(tokenPayload);

// //         res.json({ token });

// //     } catch (error) {
// //         console.error("Admin login error:", error);
// //         RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
// //     }
// // };

// // module.exports = adminLogin;



// // 
// // async function generateHashedPassword(password) {
// //     try {
// //         const salt = await bcrypt.genSalt(10);
// //         const hashedPassword = await bcrypt.hash(password, salt);
// //         return hashedPassword;
// //     } catch (error) {
// //         console.error("Error generating hashed password:", error);
// //         throw error;
// //     }
// // }

// // const password = "yoiredssword";
// // generateHashedPassword(password)
// //     .then(hashedPassword => {
// //         console.log("Generated Hashed Password:", hashedPassword);
// //     })
// //     .catch(error => {
// //         console.error("Error:", error);
// //     });



// // 

// // 
// // const bcrypt = require("bcrypt");
// // const { RES, STATUS } = require("../../common/common");
// // const createToken = require("../../utils/helper");
// // const Admin = require("../../db/models/Admin");

// // const adminLogin = async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         if (!email || !password) {
// //             return RES(res, STATUS.BAD_REQUEST, "Enter valid credentials");
// //         }

// //         // Fetch admin by email
// //         const admin = await Admin.findOne({ where: { email: email.toLowerCase() } });

// //         if (!admin) {
// //             return RES(res, STATUS.NOT_FOUND, "Email not found");
// //         }

// //         // Compare the provided password with the hashed password from the database
// //         const isMatch = await bcrypt.compare(password, admin.password);

// //         if (!isMatch) {
// //             return RES(res, STATUS.UNAUTHORIZED, "Invalid password");
// //         }

// //         const tokenPayload = {
// //             id: admin.id,
// //             email: admin.email,
// //             role: "ADMIN"  
// //         };

// //         const token = createToken(tokenPayload);

// //         res.json({ token });

// //     } catch (error) {
// //         console.error("Admin login error:", error);
// //         RES(res, STATUS.INTERNAL_SERVER_ERROR, "Internal Server Error");
// //     }
// // };

// // module.exports = adminLogin;
