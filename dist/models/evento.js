"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventoSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    schedule: { type: String, required: true, trim: true }, // p.ej. "16:30 - 17:30"
    address: { type: String, trim: true }, //(Latitud y Longitud, para usar geojson)
    participants: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Usuario' }]
}, { timestamps: false, versionKey: false });
const Evento = mongoose_1.default.model('Evento', eventoSchema);
exports.default = Evento;
