import { Router } from "express";
import { CidadeService } from "../../Application/Services/CidadeService";
import { EntityExtensions } from "../../Application/Extensions/EntityExtensions";
import { Cidade } from "../../Domain/Entities/Cidade";
import { ICidadeCreateRequest, ICidadeResponse, ICidadeUpdateRequest } from "../../Application/Dtos/CidadeDto";

/**
 * Router para gerenciar operações de cidades
 * Contém toda a lógica de processamento de requisições
 */
export class CidadeRouter {
  /**
   * Cria nova instância do router de cidades
   * @param service - Serviço de cidades
   */
  constructor(private readonly service: CidadeService) {}

  /**
   * Inicializa as rotas de cidades
   * @returns Router configurado
   */
  public getRouter(): Router {
    const router = Router();

    /**
     * POST /cidades
     * Cria uma nova cidade
     */
    router.post("/", async (req, res) => {
      try {
        const request: ICidadeCreateRequest = req.body;
        const entity = EntityExtensions.toCidadeEntity(request);
        const created = await this.service.create(entity);
        const response = EntityExtensions.toCidadeResponseDto(created);
        res.status(201).json(response);
      } catch (error) {
        console.error("Erro ao criar cidade:", error);
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
        const entity = await this.service.getById(id);
        if (entity) {
          const response = EntityExtensions.toCidadeResponseDto(entity);
          res.status(200).json(response);
        } else {
          res.status(404).json({ error: "Cidade não encontrada" });
        }
      } catch (error) {
        console.error("Erro ao buscar cidade:", error);
        res.status(500).json({ error: "Erro ao buscar cidade" });
      }
    });

    /**
     * GET /cidades
     * Lista todas as cidades
     * Permite filtrar por qualquer atributo
     */
    router.get("/", async (req, res) => {
      try {
        const filters = req.query;
        const entityFilters: Partial<Cidade> = {
          ativo: filters.ativo !== undefined 
            ? (filters.ativo as string) === "true" 
            : undefined
        };
        // Merge com outros filtros
        Object.entries(filters).forEach(([key, value]) => {
          if (key !== "ativo" && value) {
            (entityFilters as any)[key] = value;
          }
        });

        const entities = await this.service.findByFilters(entityFilters);
        const response = EntityExtensions.toCidadeResponseDtoList(entities);
        res.status(200).json(response);
      } catch (error) {
        console.error("Erro ao listar cidades:", error);
        res.status(500).json({ error: "Erro ao listar cidades" });
      }
    });

    /**
     * PUT /cidades
     * Atualiza uma cidade existente
     */
    router.put("/", async (req, res) => {
      try {
        const request: ICidadeUpdateRequest = req.body;
        const entity = EntityExtensions.toCidadeEntity(request);
        const updated = await this.service.update(entity);
        const response = EntityExtensions.toCidadeResponseDto(updated);
        res.status(200).json(response);
      } catch (error) {
        console.error("Erro ao atualizar cidade:", error);
        res.status(500).json({ error: "Erro ao atualizar cidade" });
      }
    });

    /**
     * DELETE /cidades/{id}
     * Remove (soft delete) uma cidade - atualiza o atributo Active para false
     */
    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const success = await this.service.remove(id);
        if (success) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: "Cidade não encontrada" });
        }
      } catch (error) {
        console.error("Erro ao remover cidade:", error);
        res.status(500).json({ error: "Erro ao remover cidade" });
      }
    });

    return router;
  }
}
