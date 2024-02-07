
const { RES, STATUS } = require("../common/common")
const jwt = require('jsonwebtoken');

require("dotenv").config()

const isCordinator = async (req, res) => {
    const tokenn = req.headers.authorization;
    try {
        if (!tokenn) {
            return RES(res, STATUS.NOT_FOUND);
        }
        const tokenArr = tokenn?.split(" ");
        const token = tokenArr.length > 1 ? tokenArr[1] : "";
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decode) {
            return RES(res, STATUS.NOT_FOUND);
        }
        if (decode.role !== req.PcId) {
            return RES(res, STATUS.BAD_REQUEST);
        }
        req.PcId = decode.role;
        return RES(res, STATUS.OK);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
module.exports = { isCordinator }



// const isPC = async (req, res, next) => {
//     try {
//         const  token  = req.headers.authorization
//         if (!token) {
//             return RES(res, STATUS.NOT_FOUND)
//         }
//         const tokenArr = token?.split(" ");
//         const tokenn = tokenArr.length > 1 ? tokenArr[1] : ""
//         const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
//         console.log(decode, "in PC MIDLEWARE ")
//         next()
//     } catch (error) {
//         console.log(error)
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR)
//     }
// }
// module.exports = isPC

