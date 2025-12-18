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
exports.leaveEvento = exports.joinEvento = exports.deleteEvento = exports.updateEvento = exports.getEventoById = exports.getAllEventos = exports.createEvento = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const evento_1 = __importDefault(require("../models/evento"));
const createEvento = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const ev = new evento_1.default(data);
    return yield ev.save();
});
exports.createEvento = createEvento;
/*
export const getAllEventos = async () => {
  return await Evento.find().sort({ createdAt: -1 });
};
*/
//getAllEventos
const getAllEventos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield evento_1.default.find();
});
exports.getAllEventos = getAllEventos;
const getEventoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield evento_1.default.findById(id);
});
exports.getEventoById = getEventoById;
const updateEvento = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield evento_1.default.findByIdAndUpdate(id, data, { new: true });
});
exports.updateEvento = updateEvento;
const deleteEvento = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield evento_1.default.deleteOne({ _id: id });
});
exports.deleteEvento = deleteEvento;
const joinEvento = (eventoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const evento = yield evento_1.default.findById(eventoId);
    if (!evento) {
        throw new Error('Evento no encontrado');
    }
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    // Verificar si ya está inscrito
    const alreadyJoined = (_a = evento.participants) === null || _a === void 0 ? void 0 : _a.some((participant) => participant.toString() === userId);
    if (alreadyJoined) {
        throw new Error('Ya estás inscrito en este evento');
    }
    evento.participants = evento.participants || [];
    evento.participants.push(userObjectId);
    return yield evento.save();
});
exports.joinEvento = joinEvento;
const leaveEvento = (eventoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const evento = yield evento_1.default.findById(eventoId);
    if (!evento) {
        throw new Error('Evento no encontrado');
    }
    // Verificar si está inscrito
    const isJoined = (_a = evento.participants) === null || _a === void 0 ? void 0 : _a.some((participant) => participant.toString() === userId);
    if (!isJoined) {
        throw new Error('No estás inscrito en este evento');
    }
    evento.participants = ((_b = evento.participants) === null || _b === void 0 ? void 0 : _b.filter((participant) => participant.toString() !== userId)) || [];
    return yield evento.save();
});
exports.leaveEvento = leaveEvento;
