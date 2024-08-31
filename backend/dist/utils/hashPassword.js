"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (password) => {
    return bcryptjs_1.default.hashSync(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = (oriPassword, hashPassword) => {
    return bcryptjs_1.default.compare(oriPassword, hashPassword);
};
exports.comparePassword = comparePassword;
