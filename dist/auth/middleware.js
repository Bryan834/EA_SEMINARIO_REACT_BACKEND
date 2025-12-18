"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.authenticateRefreshToken = authenticateRefreshToken;
const token_1 = require("./token");
function authenticateToken(req, res, next) {
    var _a;
    const authHeader = req.headers["authorization"];
    const token = (_a = (authHeader && authHeader.split(" ")[1])) !== null && _a !== void 0 ? _a : ""; // Bearer <token>
    if (!token) {
        return res.status(401).json({ error: "Token requerido" });
    }
    const decoded = (0, token_1.verifyToken)(token);
    if (!decoded) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
    const rol = decoded.payload.rol;
    if (rol !== 'admin') {
        return res.status(403).json({ error: "Se requieren privilegios de administrador" });
    }
    console.log("Token verificado, usuario:", decoded);
    next();
}
function authenticateRefreshToken(req, res, next) {
    try {
        const { refreshToken, userId } = req.body;
        if (!refreshToken || !userId) {
            return res.status(401).json({ error: "Refresh token y userId requeridos" });
        }
        const decoded = (0, token_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            return res.status(401).json({ error: "Refresh token inválido o expirado" });
        }
        req.user = decoded;
        const refreshtokenUserid = decoded.payload.id;
        // Verificar que el userId del body coincide con el del token
        if (refreshtokenUserid !== userId) {
            return res.status(403).json({ error: "El userId no coincide con el del token" });
        }
        console.log("Refresh token verificado correctamente:", decoded);
        next();
    }
    catch (error) {
        console.error("Error al verificar refresh token:", error);
        return res.status(500).json({ error: "Error interno en la verificación del refresh token" });
    }
}
