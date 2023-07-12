"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./src/routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/** Rules of our API */
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.options('*', (0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Welcome to the Bug Tracker API!');
});
app.use("/api/v1", index_1.default);
/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message,
    });
});
mongoose_1.default
    .connect(process.env.MONGODB_API_KEY, { retryWrites: true, w: 'majority' })
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Successfully connected to MONGODB ATLAS!');
        console.log('Port:', process.env.PORT.toString());
    });
})
    .catch((error) => {
    console.log('Unable to connect to MONGODB ATLAS!');
    console.error(error);
});
