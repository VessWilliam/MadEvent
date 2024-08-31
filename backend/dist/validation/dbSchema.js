"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name require"),
    email: zod_1.z.string().email("Invalid Email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.enum(["admin", "user"]),
});
exports.eventSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    location: zod_1.z.string().min(1, "Location is required"),
    thumbnail: zod_1.z.string().optional(),
    status: zod_1.z.enum(["Ongoing", "Completed"]),
});
