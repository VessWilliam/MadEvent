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
const mongoose_1 = __importDefault(require("mongoose"));
const statusModel_1 = __importDefault(require("../models/statusModel"));
const dbSchema_1 = require("../validation/dbSchema");
const validateSchema_1 = require("../utils/validateSchema");
class StatusService {
    createStatus(statusData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateStatus = (0, validateSchema_1.validateSchema)(dbSchema_1.statusSchema, statusData);
                if (typeof validateStatus === "string") {
                    return validateStatus;
                }
                const status = new statusModel_1.default(validateStatus);
                yield status.save();
                return { name: status.name };
            }
            catch (error) {
                return `Error Creating Status: ${error.message}`;
            }
        });
    }
    getALLStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const statuses = yield statusModel_1.default.find();
                return statuses.map((status) => ({
                    name: status.name,
                }));
            }
            catch (error) {
                return `Error Getting Status: ${error.message}`;
            }
        });
    }
    updateStatus(id, statusData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validateStatus = (0, validateSchema_1.validateSchema)(dbSchema_1.statusSchema, statusData);
                if (typeof validateStatus === "string") {
                    return validateStatus;
                }
                if (Object.keys(validateStatus).length === 0) {
                    return `No valid fields to update.`;
                }
                const updatedStatus = yield statusModel_1.default.findByIdAndUpdate(id, validateStatus, {
                    new: true,
                    runValidators: true,
                });
                if (!updatedStatus) {
                    return `Status with ID ${id} not found.`;
                }
                return { name: updatedStatus.name };
            }
            catch (error) {
                return `Error Updating Status: ${error.message}`;
            }
        });
    }
    deleteStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                    return "Invalid status ID format";
                }
                const removestatus = yield statusModel_1.default.findByIdAndDelete(id);
                if (!removestatus) {
                    return "Status not found";
                }
                return { name: removestatus.name };
            }
            catch (error) {
                return `Error Removing Status: ${error.message}`;
            }
        });
    }
}
exports.default = new StatusService();
