import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * Interface estendida para Request com usuário autenticado
 */
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

/**
 * Middleware de autenticação JWT
 * @param secret - Segredo do JWT
 * @returns Middleware de autenticação
 */
export const JWTAuthMiddleware = (secret: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    /**
     * Valida o token JWT da requisição
     * Comentado para permitir desenvolvimento sem autenticação
     */
    // const authHeader = req.headers.authorization;
    // 
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   res.status(401).json({ error: "Token de autenticação ausente" });
    //   return;
    // }
    // 
    // const token = authHeader.substring(7);
    // 
    // try {
    //   const decoded = verify(token, secret);
    //   (req as AuthenticatedRequest).user = decoded;
    //   next();
    // } catch (error) {
    //   res.status(401).json({ error: "Token inválido ou expirado" });
    // }
    
    // Desabilitado temporariamente para desenvolvimento
    next();
  };
};
