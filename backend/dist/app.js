"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const authMiddle_1 = require("./middleware/authMiddle");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//Cors
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
//JWT
app.use(authMiddle_1.auth);
//Json
app.use(express_1.default.json());
//routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/event", eventRoutes_1.default);
//Mongoose ODM
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => console.log("MongoDB connection error:", error));
