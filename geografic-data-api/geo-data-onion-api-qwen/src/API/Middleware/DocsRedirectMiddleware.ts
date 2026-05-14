import { Request, Response, NextFunction } from "express";

/**
 * Middleware para redirecionar para a documentação Swagger
 */
export const DocsRedirectMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  /**
   * Redireciona requisições para /docs para a documentação Swagger
   */
  res.redirect("/api-docs");
};
