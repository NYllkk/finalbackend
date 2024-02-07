// const { RES } = require("../common/common");

const { RES, STATUS } = require("../common/common")

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
        return next();
    }
    return RES(res, STATUS.UNAUTHORIZED, 'User not authenticated');
};

module.exports = isAuthenticated;

// const isAuthenticated = (req, res, next) => {
//     req.user ? next() : RES(res, STATUS.BAD_GATEWAY)
// }
// module.exports = isAuthenticated