const { DataTypes } = require("sequelize");
const sequelize = require("../../sequlize");
const Employee = require("./Employee");

const Bug = sequelize.define("Bug", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(['New', 'inProgress', 'Resolved', 'closed']),
        allowNull: true,
        defaultValue: 'New'
    }
});

Bug.belongsTo(Employee, {
    foreignKey: 'createdBy',
    targetKey: 'firstName',
});

module.exports = Bug;




// router.post('/bugs', CreateBug);

// Get details of a bug by ID
// router.get('/bugs/:bugId', getbug);



// Bug.belongsTo(Employee, { foreignKey: 'createdBy', as: 'creator' });





// 
// const createBug = async (req, res) => {
//     const { title, description, createdBy, status } = req.body;

//     try {

//         const employee = await Employees.findOne({
//             where: { firstName: createdBy }
//         });

//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found.' });
//         }

//         const bug = await Bug.create({
//             title,
//             description,
//             createdBy: employee.id,
//         });

//         return res.status(201).json({ message: 'Bug created successfully', bug });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// 
// const getBugDetails = async (req, res) => {
//     try {
//         const bug = await Bug.findOne({
//             where: { id: req.params.bugId },
//             include: [{
//                 model: Employees,
//                 where: { id: sequelize.col('Bug.createdBy') },
//                 attributes: ['id', 'firstName']  
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



