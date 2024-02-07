const jwt = require("jsonwebtoken");
const { RES, STATUS } = require("../common/common");
require("dotenv").config();

const istest = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return RES(res, STATUS.NOT_FOUND);
        }
        let tokenArr = token?.split(" ");
        token = tokenArr.length > 1 ? tokenArr[1] : "";
        if (!token) {
            return RES(res, STATUS.UNAUTHORIZED, 'Token is required');
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decode, "here in decode ")
        if (!decode.id) {
            return RES(res, STATUS.INTERNAL_SERVER_ERROR);
        }
        req.testid = decode.id;
        next();
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};

module.exports = istest;
// http://192.168.29.84:2000/api/test//update/10

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwdWZmaW5AeW9wbWFpbC5jb20iLCJpYXQiOjE3MDU0MDI4MjEsImV4cCI6MTcwNTQwNjQyMX0.wYXhZCtM1ZwtgcE5XDjJMf5udE93xPePHb8TlIfxQAs