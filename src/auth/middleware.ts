// auth/middleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken, verifyRefreshToken } from "./token";

// ✅ Middleware para CUALQUIER usuario autenticado
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token: string = (authHeader && authHeader.split(" ")[1]) ?? "";

    if (!token) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    // Guardar usuario en request SIN validar rol
    (req as any).user = decoded;

    console.log("Token verificado, usuario:", decoded);
    next();
  } catch (error) {
    console.error("Error en authenticateToken:", error);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

// ✅ Middleware para SOLO administradores
export async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token: string = (authHeader && authHeader.split(" ")[1]) ?? "";

    if (!token) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    const rol: string = (decoded as any).payload.rol;

    // Validar que sea admin
    if (rol !== 'admin') {
      return res.status(403).json({ error: "Se requieren privilegios de administrador" });
    }

    (req as any).user = decoded;

    console.log("Token verificado, usuario admin:", decoded);
    next();
  } catch (error) {
    console.error("Error en authenticateAdmin:", error);
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

// ✅ Middleware para refresh token
export async function authenticateRefreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken, userId } = req.body;
    if (!refreshToken || !userId) {
      return res.status(401).json({ error: "Refresh token y userId requeridos" });
    }

    const decoded = await verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ error: "Refresh token inválido o expirado" });
    }

    (req as any).user = decoded;

    const refreshTokenUserId: string = (decoded as any).payload.id;
    
    // Verificar que el userId del body coincide con el del token
    if (refreshTokenUserId !== userId) {
      return res.status(403).json({ error: "El userId no coincide con el del token" });
    }

    console.log("Refresh token verificado correctamente:", decoded);
    next();
  } catch (error) {
    console.error("Error en authenticateRefreshToken:", error);
    return res.status(401).json({ error: "Refresh token inválido o expirado" });
  }
}