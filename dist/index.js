"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const eventoRoutes_1 = __importDefault(require("./routes/eventoRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
const port = 3001;
app.use((0, cors_1.default)({
    origin: '*', // Reemplaza con el origen de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
//////////////////////AQUI APLICAMOS LAS VARIABLES PARA EL MIDDLE WARE CORS//////////////////////
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use('/api/user', usuarioRoutes_1.default);
app.use('/api/event', eventoRoutes_1.default);
//////////////////////AQUI CONECTAMOS A LA BASE DE DATOS//////////////////////
mongoose_1.default.connect('mongodb://localhost:27017/BBDD')
    .then(() => {
    console.log('CONEXION EXITOSA A LA BASE DE DATOS DE MONGODB');
    app.listen(PORT, () => {
        console.log(`URL DEL SERVIDOR http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('HAY ALGUN ERROR CON LA CONEXION', err);
});
