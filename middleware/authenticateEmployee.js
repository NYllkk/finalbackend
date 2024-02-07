const { STATUS, RES } = require("../common/common");
const { Employees } = require("../db/models/Employee")
const jwt = require('jsonwebtoken');

require("dotenv").config();

const authenticateEmployee = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authorization token missing" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const employee = await Employees.findByPk(decoded.id);
        if (!employee) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.employee = employee;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authenticateEmployee;


