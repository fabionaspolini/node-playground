import { Router } from "express";
import { PaisService } from "../../Application/Services/PaisService";
import { EntityExtensions } from "../../Application/Extensions/EntityExtensions";
import { Pais } from "../../Domain/Entities/Pais";
import { IPaisCreateRequest, IPaisResponse, IPaisUpdateRequest } from "../../Application/Dtos/PaisDto";

/**
 * Router para gerenciar operações de países
 * Contém toda a lógica de processamento de requisições
 */
export class PaisRouter {
  /**
   * Cria nova instância do router de países
   * @param service - Serviço de países
   */
  constructor(private readonly service: PaisService) {}

  /**
   * Inicializa as rotas de países
   * @returns Router configurado
   */
  public getRouter(): Router {
    const router = Router();

    /**
     * POST /cidades
     * Cria um novo país
     */
    router.post("/", async (req, res) => {
      try {
        const request: IPaisCreateRequest = req.body;
        const entity = EntityExtensions.toPaisEntity(request);
        const created = await this.service.create(entity);
        const response = EntityExtensions.toPaisResponseDto(created);
        res.status(201).json(response);
      } catch (error) {
        console.error("Erro ao criar país:", error);
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
        const entity = await this.service.getById(id);
        if (entity) {
          const response = EntityExtensions.toPaisResponseDto(entity);
          res.status(200).json(response);
        } else {
          res.status(404).json({ error: "País não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao buscar país:", error);
        res.status(500).json({ error: "Erro ao buscar país" });
      }
    });

    /**
     * GET /cidades
     * Lista todos os países
     * Permite filtrar por qualquer atributo
     */
    router.get("/", async (req, res) => {
      try {
        const filters = req.query;
        const ativo = filters.ativo as string;
        const entityFilters: Partial<Pais> = {
          ativo: ativo !== undefined ? ativo === "true" : undefined
        };
        // Merge com outros filtros
        Object.entries(filters).forEach(([key, value]) => {
          if (key !== "ativo" && value) {
            (entityFilters as any)[key] = value;
          }
        });

        const entities = await this.service.findByFilters(entityFilters);
        const response = EntityExtensions.toPaisResponseDtoList(entities);
        res.status(200).json(response);
      } catch (error) {
        console.error("Erro ao listar países:", error);
        res.status(500).json({ error: "Erro ao listar países" });
      }
    });

    /**
     * PUT /paises/{id}
     * Atualiza um país existente
     */
    router.put("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const request: IPaisUpdateRequest = { ...req.body, id };
        const entity = EntityExtensions.toPaisEntity(request);
        const updated = await this.service.update(entity);
        const response = EntityExtensions.toPaisResponseDto(updated);
        res.status(200).json(response);
      } catch (error) {
        console.error("Erro ao atualizar país:", error);
        res.status(500).json({ error: "Erro ao atualizar país" });
      }
    });

    /**
     * DELETE /cidades/{id}
     * Remove (soft delete) um país - atualiza o atributo Active para false
     */
    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const success = await this.service.remove(id);
        if (success) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: "País não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao remover país:", error);
        res.status(500).json({ error: "Erro ao remover país" });
      }
    });

    return router;
  }
}
