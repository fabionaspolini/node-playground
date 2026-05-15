import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Filtro global de autenticação (comentado conforme solicitado).
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  /*
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    (req as any).user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
  */
  return next();
};
