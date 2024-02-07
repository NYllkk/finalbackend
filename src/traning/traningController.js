 const { reset } = require("nodemon")
const { RES, STATUS } = require("../../common/common")
const Employee = require("../../db/models/Employee")
 const Traininig = require("../../db/models/Training")
const createToken = require("./../../utils/helper")

const CreateTraining = async (req, res) => {
    const { title, description, trainingType } = req.body
    try {
        const training = await Traininig.create({
            title, description, trainingType, 
        })
        // const token = createToken({
        //         trainingId: training.id,
        //         title: training.title,
        // })
        // return RES(res, STATUS.OK, "Training Created","u3huewhfuegfueg",token)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const DeleTraining = async (req, res) => {
   console.log("in deletrainig api ")
    const { id } = req.params
    try {
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const find = await Traininig.findByPk(id)
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        await find.destroy()
        return RES(res, STATUS.OK, "USER DELETED SUCCESFULLY", find)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const getTraining = async (req, res) => {
    console.log("hihihihi in get traning")
    const { id } = req.params
    if (!id) {
        return RES(res, STATUS.NOT_FOUND,"User is Deleted")
    }
    const find = await Traininig.findByPk(id)
    if (!find) {
        return RES(res, STATUS.NOT_FOUND)
    }
    return RES(res, STATUS.OK, "GET TRAining SUCCESFully", find)
}

const updatetraining = async(req,res)=>{
    const {id} = req.params
    const { title, description, trainingType } = req.body
   try {
       const find = await Traininig.findByPk(id)
       if (!id) {
           RES(res, STATUS.NOT_FOUND)
       }
       find.title = title
       find.description = description
       find.trainingType = trainingType
       await find.save()
       return RES(res, STATUS.OK, "UPDATED SUCCESFULLY ", find)
   } catch (error) {
    console.log(error)
    return RES(res,STATUS.INTERNAL_SERVER_ERROR)
   }
}

module.exports = { CreateTraining, DeleTraining, getTraining, updatetraining }

    // /employee/traning/CreateTraining


// http://192.168.1.43:2000/api/pc/get
    // module.exports = {
    //     DeleTraining,
    //     getTraining
    // };



  







// // const { Training, Employee } = require('./models'); // Adjust the path to where your models are located

// // const CreateTraining = async (req, res) => {
// //     const { title, description, trainingType } = req.body;
// //     const employeeId = req.user.id; 

// //     try {
// //         // Check if the employee exists
// //         const employee = await Employee.findByPk(employeeId);
// //         if (!employee) {
// //             return res.status(404).json({ message: 'Employee not found.' });
// //         }

// //         // Create the training and associate it with the employee
// //         const training = await Training.create({
// //             title,
// //             description,
// //             trainingType,
// //             EmployeeId: employeeId  // This assumes you have a foreign key named EmployeeId in your Training model
// //         });

// //         return res.status(201).json(training);
// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).json({ message: 'Internal server error.' });
// //     }
// // };

// // module.exports = CreateTraining;
