"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const account_1 = __importDefault(require("./routes/account"));
const questions_1 = __importDefault(require("./routes/questions"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const PORT = process.env.PORT ?? 8003;
const key1 = process.env.SESSION_KEY1;
mongoose_1.default.connect('mongodb+srv://jhayaly:otYJmzQ19fKp5FQS@cluster0.ki0ozef.mongodb.net/?tls=true')
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
const MongoDBStoreInstance = (0, connect_mongodb_session_1.default)(express_session_1.default);
const store = new MongoDBStoreInstance({
    uri: 'mongodb+srv://jhayaly:otYJmzQ19fKp5FQS@cluster0.ki0ozef.mongodb.net/?tls=true',
    collection: 'sessions'
});
app.use((0, express_session_1.default)({
    secret: key1 ?? 'janas-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3003',
    credentials: true
}));
app.use('/api/account', account_1.default);
app.use('/api/questions', questions_1.default);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err, req, res, next) {
    res.status(500).json({ message: err.message });
}
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}.`);
});
