"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const generateToken = (userId, role, additionalClaims) => {
    const payload = Object.assign({ userId, role }, additionalClaims);
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        switch (error.name) {
            case "TokenExpiredError":
                return { error: "Token expired" };
            case "JsonWebTokenError":
                return { error: "Invalid token" };
            default:
                return { error: "Token verification failed" };
        }
    }
};
exports.verifyToken = verifyToken;
