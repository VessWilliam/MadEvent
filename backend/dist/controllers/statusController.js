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
exports.deleteStatus = exports.updateStatus = exports.getAllStatus = exports.createStatus = void 0;
const statusService_1 = __importDefault(require("../services/statusService"));
const createStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield statusService_1.default.createStatus(req.body);
        res.status(201).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createStatus = createStatus;
const getAllStatus = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield statusService_1.default.getALLStatus();
        res.status(200).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllStatus = getAllStatus;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = yield statusService_1.default.updateStatus(id, req.body);
        res.status(201).json(status);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateStatus = updateStatus;
const deleteStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = yield statusService_1.default.deleteStatus(id);
        if (typeof status === "string") {
            return res.status(404).json({ error: status });
        }
        res.status(200).json({ message: "Status deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteStatus = deleteStatus;
