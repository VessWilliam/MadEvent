"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const dbSchema_1 = require("../validation/dbSchema");
const validateSchema_1 = require("../utils/validateSchema");
const jwtUtills_1 = require("../utils/jwtUtills");
const hashPassword_1 = require("../utils/hashPassword");
class UserService {
    mapUserResponse(user) {
        return {
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ email })
                    .select("+password")
                    .lean();
                if (!user) {
                    return "User not found";
                }
                if (!(yield (0, hashPassword_1.comparePassword)(password, user.password))) {
                    return "Invalid password";
                }
                const token = (0, jwtUtills_1.generateToken)(user._id, user.role);
                return {
                    user: {
                        name: user.name,
                        email: user.email,
                    },
                    token,
                };
            }
            catch (error) {
                return `Error authenticating user: ${error.message}`;
            }
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateUser = (0, validateSchema_1.validateSchema)(dbSchema_1.userSchema, userData);
                if (typeof validateUser === "string") {
                    return validateUser;
                }
                const hashedPassword = yield (0, hashPassword_1.hashPassword)(validateUser.password);
                const user = new userModel_1.default(Object.assign(Object.assign({}, validateUser), { password: hashedPassword }));
                yield user.save();
                const token = (0, jwtUtills_1.generateToken)(user._id, user.role);
                return {
                    user: this.mapUserResponse(user),
                    token,
                };
            }
            catch (error) {
                return `Error creating user: ${error.message}`;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.find()
                    .select("name email role createdAt")
                    .lean();
                return users.map((user) => this.mapUserResponse(user));
            }
            catch (error) {
                return `Error getting users: ${error.message}`;
            }
        });
    }
}
exports.default = new UserService();
