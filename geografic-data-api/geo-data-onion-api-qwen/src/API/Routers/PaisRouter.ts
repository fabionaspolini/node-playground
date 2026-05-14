import { Router } from "express";
import { PaisController } from "../Controllers/PaisController";

/**
 * Router para gerenciar operações de países
 */
export class PaisRouter {
  /**
   * Inicializa as rotas de países
   * @param controller - Controller de países
   * @returns Router configurado
   */
  public static initialize(controller: PaisController): Router {
    const router = Router();

    /**
     * POST /cidades
     * Cria um novo país
     */
    router.post("/", async (req, res) => {
      try {
        const result = await controller.Create(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao criar país" });
      }
    });

    /**
     * GET /cidades/{id}
     * Busca um país pelo ID
     */
    router.get("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await controller.GetById(id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: "País não encontrado" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar país" });
      }
    });

    /**
     * GET /cidades
     * Lista todos os países
     */
    router.get("/", async (req, res) => {
      try {
        const result = await controller.List(req.query);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao listar países" });
      }
    });

    /**
     * PUT /cidades
     * Atualiza um país existente
     */
    router.put("/", async (req, res) => {
      try {
        const result = await controller.Update(req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar país" });
      }
    });

    /**
     * DELETE /cidades/{id}
     * Remove (soft delete) um país
     */
    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await controller.Remove(id);
        if (result) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: "País não encontrado" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao remover país" });
      }
    });

    return router;
  }
}
