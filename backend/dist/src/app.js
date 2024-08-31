"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
//import userRoute from "./routes/userRoutes";
const app = (0, express_1.default)();
dotenv_1.default.config();
//app.use(express.json(), userRoute);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful DB connection
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
})
    .catch((error) => console.log("MongoDB connection error:", error));
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send(`Server is running on port ${process.env.PORT || 5000}`);
});
// app.listen(PORT, () => {
//   console.log(`App listen on ${PORT}`);
// });
app.use;
