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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getUserByUsername = getUserByUsername;
exports.updateUserById = updateUserById;
exports.updateUserByUsername = updateUserByUsername;
exports.deleteUserById = deleteUserById;
exports.deleteUserByUsername = deleteUserByUsername;
exports.login = login;
exports.refreshAccessToken = refreshAccessToken;
const usuarioServices_1 = require("../services/usuarioServices");
const express_validator_1 = require("express-validator");
const token_1 = require("../auth/token");
const userService = new usuarioServices_1.UserService();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('crear usuario');
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { username, gmail, password, birthday, rol } = req.body;
            const newUser = { username, gmail, password, birthday, rol };
            const user = yield userService.createUser(newUser);
            return res.status(201).json({
                message: 'USUARIO CREADO CON EXITO',
                user
            });
        }
        catch (error) {
            console.error("Error al crear usuario:", error);
            return res.status(500).json({ error: 'FALLO AL CREAR EL USUARIO' });
        }
    });
}
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('obtener todos los usuarios');
        try {
            const users = yield userService.getAllUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(404).json({ message: error.message });
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('obtener usuario por id');
        try {
            const { id } = req.params;
            const user = yield userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function getUserByUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('obtener usuario por username');
        try {
            const { username } = req.params;
            const user = yield userService.getUserByUsername(username);
            if (!user) {
                return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function updateUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('actualizar usuario por id');
        try {
            const { id } = req.params;
            const userData = req.body;
            const updatedUser = yield userService.updateUserById(id, userData);
            console.log('Usuario actualizado:', updatedUser);
            if (!updatedUser) {
                return res.status(404).json({ message: "USUARIO NO ENCONTRADO" });
            }
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function updateUserByUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const username = req.params.username;
            const updatedUser = yield userService.updateUserByUsername(username, userData);
            if (!updatedUser) {
                return res.status(404).json({ message: "USUARIO NO ENCONTRADO" });
            }
            return res.status(200).json({
                user: updatedUser,
            });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function deleteUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('eliminar usuario por id');
            const { id } = req.params;
            console.log('ID recibido para eliminar:', id);
            const deletedUser = yield userService.deleteUserById(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
            }
            return res.status(200).json(deletedUser);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function deleteUserByUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.params;
            const deletedUser = yield userService.deleteUserByUsername(username);
            if (!deletedUser) {
                return res.status(404).json({ message: 'USUARIO NO ENCONTRADO' });
            }
            return res.status(200).json(deletedUser);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            console.log('login usuario', username, password);
            const user = yield userService.loginUser(username, password);
            console.log('Usuario en login:', user);
            if (!user) {
                return res.status(401).json({ error: "Credenciales inválidas" });
            }
            // Generar tokens
            const token = yield (0, token_1.generateToken)(user, res);
            const refreshToken = yield (0, token_1.generateRefreshToken)(user, res);
            // IMPORTANTE: Enviar solo los datos necesarios del usuario (sin password)
            return res.status(200).json({
                message: "LOGIN EXITOSO",
                token,
                refreshToken,
                user: {
                    _id: user._id.toString(),
                    username: user.username,
                    gmail: user.gmail,
                    birthday: user.birthday,
                    rol: user.rol
                }
            });
        }
        catch (error) {
            console.error('Error en login:', error);
            return res.status(500).json({ error: "Error en el login" });
        }
    });
}
function refreshAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.user.payload.id;
            const user = yield userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }
            const newToken = (0, token_1.generateToken)(user, res);
            return res.status(200).json({
                message: "Nuevo token generado",
                token: newToken
            });
        }
        catch (error) {
            return res.status(500).json({ error: "Error al generar nuevo token" });
        }
    });
}
