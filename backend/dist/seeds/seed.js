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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const hashPassword_1 = require("../utils/hashPassword");
dotenv_1.default.config();
function seedUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingUser = yield userModel_1.default.findOne({ email: "Superadmin@gmail.com" });
            if (!existingUser) {
                const hashedPassword = yield (0, hashPassword_1.hashPassword)("password");
                const user = {
                    name: "Superadmin",
                    email: "Superadmin@gmail.com",
                    password: hashedPassword,
                    role: "admin",
                };
                yield userModel_1.default.create(user);
                console.log("Admin user seeded.");
            }
            else {
                console.log("Admin user already exists.");
            }
        }
        catch (error) {
            console.error("Error seeding user:", error.message);
        }
    });
}
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to MongoDB");
    yield seedUser();
}))
    .catch((error) => {
    console.error("MongoDB connection error", error.message);
})
    .finally(() => {
    mongoose_1.default.connection.close();
});
