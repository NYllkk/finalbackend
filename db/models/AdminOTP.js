const { DataTypes } = require("sequelize");
const sequelize = require("../../sequlize");
const Admin = require("./Admin");
const AdminOTP = sequelize.define('AdminOTP', {
    adminId: {
        type: DataTypes.INTEGER,
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}); AdminOTP.belongsTo(Admin, {
    foreignKey: "adminId",
    targetKey: "id",
})

module.exports = AdminOTP;













// const forgotpasssword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await Admin.findOne({ where: { email } });
//         if (!user) {
//             return RES(res, STATUS.NOT_FOUND, 'User not found');
//         }

//         const otp = generateOTP();

//         const emailContent = {
//             name: user.email,
//             otp
//         };

//         const { title, description } = forgototp(emailContent);

//         // efeefe
//         await AdminOTP.create({
//             adminId: user.id,
//             otp: otp,
//             expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
//         });

//         const resetToken = createToken({
//             userId: user.id,
//             userEmail: user.email,
//         });

//         const info = await sendMail(user.email, title, description);
//         console.log("Email sent:", info);

//         await PasswordResetToken.create({
//             userId: user.id,
//             token: resetToken,
//             expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
//         });

//     } catch (error) {
//         console.error(error);
//         RES(res, STATUS.INTERNAL_SERVER_ERROR);
//     }
// }















// const { DataTypes } = require("sequelize");
// const sequelize = require("../../sequelize");
// const Admin = require("../models/Admin")

// const AdminOTP = sequelize.define("AdminOTP", {
//     adminId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Admin',
//             key: 'id'
//         }
//     },
//     otp: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     expiresAt: {
//         type: DataTypes.DATE,
//         allowNull: false
//     }
// }, {
//     tableName: 'AdminOTP'
// });

// Admin.hasOne(AdminOTP, {
//     foreignKey: 'adminId'
// });
// AdminOTP.belongsTo(Admin, {
//     foreignKey: 'adminId'
// });

// module.exports = AdminOTP;

