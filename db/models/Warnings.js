const { DataTypes } = require("sequelize")
const sequelize = require("../../sequlize")

const Warning = sequelize.define('Warning', {
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    toUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});
module.exports = Warning




















// const createWarning = async (req, res) => {
//     const { action, title, level, toUser } = req.body;
//     const { userId } = req.user;  // Assuming you have middleware to attach user info to the request

//     try {
//         const warning = await Warning.create({
//             action,
//             title,
//             level,
//             createdBy: userId,
//             toUser
//         });

//         return res.status(200).json(warning);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// }

// const getWarningsForUser = async (req, res) => {
//     const { userId } = req.params;  // User ID for which warnings need to be fetched

//     try {
//         const warnings = await Warning.findAll({
//             where: { toUser: userId }
//         });

//         return res.status(200).json(warnings);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// }


// router.post('/warnings', verifyAdmin, createWarning);  // Create Warning
// router.get('/warnings/:userId', getWarningsForUser);   // Retrieve Warnings for User
