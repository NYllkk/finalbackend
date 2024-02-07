const jwt = require('jsonwebtoken');
const { STATUS, RES } = require("../common/common");

require("dotenv").config();

const isAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(req.headers.authorization, "in middleware token ")
    console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);
    if (!token) return RES(res, STATUS.UNAUTHORIZED, "You are not authorized to access the token")
    let tokenArr = token?.split(" ");
    token = tokenArr.length > 1 ? tokenArr[1] : ""
    if (!token) {
        return RES(res, STATUS.UNAUTHORIZED, 'Token is required');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("hihihh", decoded)
        if (decoded.role !== 'ADMIN') {
            return RES(res, STATUS.FORBIDDEN, 'Access denied, not an admin');
        }
        req.adminId = decoded.id;
        next();
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.UNAUTHORIZED, 'Invalid token');
    }
};
module.exports = isAdmin;

