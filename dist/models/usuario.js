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
exports.Usuario = void 0;
//crear un modelo usuario con los atributos id, username, gmail, password y bithrday
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//creo el esquema de usuario y si nos fijamos, el atributo id no es obligatorio ya que mongoose lo crea automáticamente
const usuarioSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    gmail: { type: String, required: true, unique: true },
    //pone unique para que no se repita el correo ni el username entre todos los usuarios de la base de datos
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    rol: { type: String, required: true, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: false,
    versionKey: false
});
//encriptar la contraseña antes de guardarla en la base de datos HOOK DE MONGOOSE
usuarioSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        const salt = yield bcryptjs_1.default.genSalt();
        const hash = yield bcryptjs_1.default.hash(this.password, salt);
        this.password = hash;
        next();
    });
});
//método para comparar la contraseña ingresada con la contraseña encriptada en la base de datos
usuarioSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, this.password);
    });
};
//guardamos en una variable exportable el modelo usuario, tiene similitud cuando en DSA llamabamos a una clase(objeto)
//ya que el funcionamiento es similar.
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
//exporto el modelo usuario
exports.default = exports.Usuario;
