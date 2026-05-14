import { Router } from "express";
import { EstadoController } from "../Controllers/EstadoController";

/**
 * Router para gerenciar operações de estados
 */
export class EstadoRouter {
  /**
   * Inicializa as rotas de estados
   * @param controller - Controller de estados
   * @returns Router configurado
   */
  public static initialize(controller: EstadoController): Router {
    const router = Router();

    /**
     * POST /estados
     * Cria um novo estado
     */
    router.post("/", async (req, res) => {
      try {
        const result = await controller.Create(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao criar estado" });
      }
    });

    /**
     * GET /estados/{id}
     * Busca um estado pelo ID
     */
    router.get("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await controller.GetById(id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: "Estado não encontrado" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar estado" });
      }
    });

    /**
     * GET /estados
     * Lista todos os estados
     */
    router.get("/", async (req, res) => {
      try {
        const result = await controller.List(req.query);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao listar estados" });
      }
    });

    /**
     * PUT /estados
     * Atualiza um estado existente
     */
    router.put("/", async (req, res) => {
      try {
        const result = await controller.Update(req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar estado" });
      }
    });

    /**
     * DELETE /estados/{id}
     * Remove (soft delete) um estado
     */
    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await controller.Remove(id);
        if (result) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: "Estado não encontrado" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao remover estado" });
      }
    });

    return router;
  }
}
