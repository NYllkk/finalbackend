
// beloww one for Creating multiple instance
const multer = require('multer');
const createUploadMiddleware = (destination) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    });
    return multer({ storage: storage });
};
module.exports = createUploadMiddleware;


















// below one is where location is defined 

// const multer = require("multer");
// const path = require("path");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log(__dirname)
//         // cb(null, 'src/employee/upload')
//         cb(null, destination);
//     },
//     filename: function (req, file, cb) {
//         const fileName = `${Date.now()}-${file.originalname}`
//         cb(null, fileName)
//     },
// })

// module.exports = multer({ storage: storage });














// const createMulterMiddleware = require('./path/to/multer/middleware/factory');

// // Create Multer middleware instances with different destinations
// const uploadEmployeeImage = createMulterMiddleware('src/employee/upload');
// const uploadTaskImage = createMulterMiddleware('src/task/upload');

// // Use the Multer middleware instances in your controllers
// const uploadEmployee = uploadEmployeeImage.single('image');
// const uploadTask = uploadTaskImage.single('image');

// module.exports = { uploadEmployee, uploadTask };















//
// const verifyOTP = async (req, res) => {
//     const { email, otp } = req.body;
//     try { 
//         const user = await Employee.findOne({ where: { email } });
//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND, 'User not found');
//         } 
//         const storedOTP = await PasswordResetToken.findOne({ where: { userId: user.id } });
//         if (!storedOTP || storedOTP.token !== otp) {
//             return RES(res, STATUS.UNAUTHORIZED, 'Invalid OTP');
//         }    
//         RES(res, STATUS.SUCCESS, 'OTP verified successfully');
//     } catch (error) {
//         console.error(error);
//         RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// };

