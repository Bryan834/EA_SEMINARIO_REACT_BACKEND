"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventoController = __importStar(require("../controller/eventoController"));
const middleware_1 = require("../auth/middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /event:
 *   post:
 *     summary: Crea un nuevo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - schedule
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Seminario Node"
 *               schedule:
 *                 type: string
 *                 example: "16:30 - 17:30"
 *               address:
 *                 type: string
 *                 example: "Aula 3, Edificio A"
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 */
router.post('/', eventoController.createEventoHandler);
/**
 * @swagger
 * /event:
 *   get:
 *     summary: Lista todos los eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', eventoController.getAlleventoHandler);
/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Obtiene un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', eventoController.getEventoByIdHandler);
/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Actualiza un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               schedule:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: No encontrado
 */
router.put('/:id', eventoController.updateEventoHandler);
/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Elimina un evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Evento eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedEvento:
 *                   type: object
 *                   description: Datos del evento eliminado
 *       404:
 *         description: No encontrado
 */
router.delete('/:id', eventoController.deleteEventoHandler);
/**
 * @swagger
 * /event/{id}/join:
 *   post:
 *     summary: Inscribirse a un evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Inscripción exitosa
 *       400:
 *         description: Ya está inscrito o error
 *       401:
 *         description: No autenticado
 */
router.post('/:id/join', middleware_1.authenticateToken, eventoController.joinEventoHandler);
/**
 * @swagger
 * /event/{id}/leave:
 *   post:
 *     summary: Desinscribirse de un evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Desinscripción exitosa
 *       400:
 *         description: No está inscrito o error
 *       401:
 *         description: No autenticado
 */
router.post('/:id/leave', middleware_1.authenticateToken, eventoController.leaveEventoHandler);
exports.default = router;
