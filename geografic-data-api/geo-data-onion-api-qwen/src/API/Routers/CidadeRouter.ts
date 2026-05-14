import { Router } from "express";
import { CidadeController } from "../Controllers/CidadeController";

/**
 * Router para gerenciar operações de cidades
 */
export class CidadeRouter {
  /**
   * Inicializa as rotas de cidades
   * @param controller - Controller de cidades
   * @returns Router configurado
   */
  public static initialize(controller: CidadeController): Router {
    const router = Router();

    /**
     * POST /cidades
     * Cria uma nova cidade
     */
    router.post("/", async (req, res) => {
      try {
        const result = await controller.Create(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao criar cidade" });
      }
    });

    /**
     * GET /cidades/{id}
     * Busca uma cidade pelo ID
     */
    router.get("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await controller.GetById(id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: "Cidade não encontrada" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao buscar cidade" });
      }
    });

    /**
     * GET /cidades
     * Lista todas as cidades
     */
    router.get("/", async (req, res) => {
      try {
        const result = await controller.List(req.query);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao listar cidades" });
      }
    });

    /**
     * PUT /cidades
     * Atualiza uma cidade existente
     */
    router.put("/", async (req, res) => {
      try {
        const result = await controller.Update(req.body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar cidade" });
      }
    });

    /**
     * DELETE /cidades/{id}
     * Remove (soft delete) uma cidade
     */
    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await controller.Remove(id);
        if (result) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: "Cidade não encontrada" });
        }
      } catch (error) {
        res.status(500).json({ error: "Erro ao remover cidade" });
      }
    });

    return router;
  }
}
