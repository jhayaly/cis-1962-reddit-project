"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const require_auth_1 = __importDefault(require("../middlewares/require-auth"));
const router = express_1.default.Router();
router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email.endsWith('.edu')) {
            return res.status(409).json({ message: 'Not an edu email!' });
        }
        const userExists = await user_1.default.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({ message: 'You already have an account! Log in instead.' });
        }
        else {
            const newAcc = new user_1.default({ email: email, password: password });
            await newAcc.save();
            req.session.user = newAcc;
            return res.status(201).json({ message: 'User created!' });
        }
    }
    catch (err) {
        next(err);
    }
});
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const currUser = await user_1.default.findOne({ email: email });
        if (!currUser) {
            return res.status(409).json({ message: 'No account found! Sign up?' });
        }
        else if (currUser.password !== password) {
            return res.status(409).json({ message: 'Incorrect password!' });
        }
        else {
            req.session.user = currUser;
            return res.status(201).json({ message: 'Logged in' });
        }
    }
    catch (err) {
        next(err);
    }
});
router.post('/logout', require_auth_1.default, async (req, res, next) => {
    try {
        req.session.user = null;
        return res.status(201).json({ message: 'Logged out' });
    }
    catch (err) {
        next(err);
    }
});
router.get('/loggedin', (req, res) => {
    return req.session && req.session.user ? res.json({ loggedIn: true }) : res.json({ loggedIn: false });
});
exports.default = router;
