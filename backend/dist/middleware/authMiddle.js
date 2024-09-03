"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwtUtills_1 = require("../utils/jwtUtills");
const publicRoutes = ["/api/users/login", "/api/users/register", "/api/event/all"];
const auth = (req, res, next) => {
    var _a;
    try {
        if (publicRoutes.includes(req.path)) {
            return next();
        }
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authentication token is required" });
        }
        const decoded = (0, jwtUtills_1.verifyToken)(token);
        res.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.auth = auth;
