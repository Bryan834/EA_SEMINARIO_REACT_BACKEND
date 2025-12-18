"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
const JWT_refreshSECRET = process.env.JWT_refreshSECRET || 'defaultrefreshsecret';
const generateToken = (usuario, res) => {
    const payload = { id: usuario._id.toString(), rol: usuario.rol };
    const token = (0, jsonwebtoken_1.sign)({ payload }, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
exports.generateToken = generateToken;
const generateRefreshToken = (usuario, res) => {
    const payload = { id: usuario._id.toString(), rol: usuario.rol };
    const refreshToken = (0, jsonwebtoken_1.sign)({ payload }, JWT_refreshSECRET, { expiresIn: "1y" });
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const verifyRefreshToken = (refreshToken) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(refreshToken, JWT_refreshSECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
