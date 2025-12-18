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
exports.createEventoHandler = createEventoHandler;
exports.getAlleventoHandler = getAlleventoHandler;
exports.getEventoByIdHandler = getEventoByIdHandler;
exports.updateEventoHandler = updateEventoHandler;
exports.deleteEventoHandler = deleteEventoHandler;
exports.joinEventoHandler = joinEventoHandler;
exports.leaveEventoHandler = leaveEventoHandler;
const eventoServices_1 = require("../services/eventoServices");
function createEventoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('crear evento');
        try {
            const data = yield (0, eventoServices_1.createEvento)(req.body);
            return res.status(201).json(data);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
function getAlleventoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('obtener todos los eventos');
        try {
            const data = yield (0, eventoServices_1.getAllEventos)();
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
function getEventoByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('obtener evento por id');
        try {
            const { id } = req.params;
            const data = yield (0, eventoServices_1.getEventoById)(id);
            if (!data) {
                return res.status(404).json({ message: 'EVENTO NO ENCONTRADO' });
            }
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function updateEventoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('actualizar evento por id');
        try {
            const { id } = req.params;
            const data = yield (0, eventoServices_1.updateEvento)(id, req.body);
            if (!data) {
                return res.status(404).json({ message: 'EVENTO NO ENCONTRADO' });
            }
            return res.status(200).json(data);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function deleteEventoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('eliminar evento por id');
        try {
            const { id } = req.params;
            console.log('ID recibido para eliminar:', id);
            const data = yield (0, eventoServices_1.deleteEvento)(id);
            if (!data) {
                return res.status(404).json({ message: 'EVENTO NO ENCONTRADO' });
            }
            return res.status(200).json({
                message: 'EVENTO ELIMINADO CON ÉXITO',
                deletedEvento: data
            });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}
function joinEventoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log('inscribirse a evento');
        try {
            console.log('Usuario autenticado:', req.user);
            const eventoId = req.params.id;
            const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.id;
            if (!userId) {
                return res.status(401).json({ error: 'Usuario no identificado en el token' });
            }
            console.log('EventoId:', eventoId, 'UserId:', userId);
            const evento = yield (0, eventoServices_1.joinEvento)(eventoId, userId);
            return res.status(200).json({
                message: 'Te has inscrito al evento exitosamente',
                evento
            });
        }
        catch (error) {
            console.error('Error en joinEventoHandler:', error);
            return res.status(400).json({ message: error.message });
        }
    });
}
function leaveEventoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log('desinscribirse de evento');
        try {
            console.log('Usuario autenticado:', req.user);
            const eventoId = req.params.id;
            const userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.id;
            if (!userId) {
                return res.status(401).json({ error: 'Usuario no identificado en el token' });
            }
            console.log('EventoId:', eventoId, 'UserId:', userId);
            const evento = yield (0, eventoServices_1.leaveEvento)(eventoId, userId);
            return res.status(200).json({
                message: 'Te has desinscrito del evento exitosamente',
                evento
            });
        }
        catch (error) {
            console.error('Error en leaveEventoHandler:', error);
            return res.status(400).json({ message: error.message });
        }
    });
}
