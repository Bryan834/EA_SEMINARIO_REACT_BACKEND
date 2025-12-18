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
exports.UserService = void 0;
const usuario_1 = require("../models/usuario");
class UserService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new usuario_1.Usuario(user);
                return yield newUser.save();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_1.Usuario.find();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_1.Usuario.findById(id);
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_1.Usuario.findOne({ username });
        });
    }
    updateUserById(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usuario_1.Usuario.findById(id);
            if (!user)
                return null;
            Object.assign(user, userData);
            return user.save();
        });
    }
    updateUserByUsername(username, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_1.Usuario.findOneAndUpdate({ username }, user, { new: true });
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('deleteUserById en UserService con id:', id);
            return yield usuario_1.Usuario.findByIdAndDelete(id);
        });
    }
    deleteUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield usuario_1.Usuario.findOneAndDelete({ username });
        });
    }
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('loginUser en UserService con:', username, password);
                const User = yield usuario_1.Usuario.findOne({ username });
                console.log('Usuario encontrado en loginUser:', User);
                if (!User) {
                    return null;
                }
                const isPasswordValid = yield User.comparePassword(password);
                if (!isPasswordValid) {
                    console.log('Contraseña inválida para el usuario:', username);
                    return null;
                }
                return User;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserService = UserService;
