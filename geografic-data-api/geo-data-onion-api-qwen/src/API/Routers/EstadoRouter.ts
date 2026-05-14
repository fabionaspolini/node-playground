import { Router } from "express";
import { EstadoService } from "../../Application/Services/EstadoService";
import { EntityExtensions } from "../../Application/Extensions/EntityExtensions";
import { Estado } from "../../Domain/Entities/Estado";
import { IEstadoCreateRequest, IEstadoResponse, IEstadoUpdateRequest } from "../../Application/Dtos/EstadoDto";

/**
 * Router para gerenciar operações de estados
 * Contém toda a lógica de processamento de requisições
 */
export class EstadoRouter {
  /**
   * Cria nova instância do router de estados
   * @param service - Serviço de estados
   */
  constructor(private readonly service: EstadoService) {}

  /**
   * Inicializa as rotas de estados
   * @returns Router configurado
   */
  public getRouter(): Router {
    const router = Router();

    /**
     * POST /estados
     * Cria um novo estado
     */
    router.post("/", async (req, res) => {
      try {
        const request: IEstadoCreateRequest = req.body;
        const entity = EntityExtensions.toEstadoEntity(request);
        const created = await this.service.create(entity);
        const response = EntityExtensions.toEstadoResponseDto(created);
        res.status(201).json(response);
      } catch (error) {
        console.error("Erro ao criar estado:", error);
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
        const entity = await this.service.getById(id);
        if (entity) {
          const response = EntityExtensions.toEstadoResponseDto(entity);
          res.status(200).json(response);
        } else {
          res.status(404).json({ error: "Estado não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao buscar estado:", error);
        res.status(500).json({ error: "Erro ao buscar estado" });
      }
    });

    /**
     * GET /estados
     * Lista todos os estados
     * Permite filtrar por qualquer atributo
     */
    router.get("/", async (req, res) => {
      try {
        const filters = req.query;
        const entityFilters: Partial<Estado> = {
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
        const response = EntityExtensions.toEstadoResponseDtoList(entities);
        res.status(200).json(response);
      } catch (error) {
        console.error("Erro ao listar estados:", error);
        res.status(500).json({ error: "Erro ao listar estados" });
      }
    });

    /**
     * PUT /estados/{id}
     * Atualiza um estado existente
     */
    router.put("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const request: IEstadoUpdateRequest = { ...req.body, id };
        const entity = EntityExtensions.toEstadoEntity(request);
        const updated = await this.service.update(entity);
        const response = EntityExtensions.toEstadoResponseDto(updated);
        res.status(200).json(response);
      } catch (error) {
        console.error("Erro ao atualizar estado:", error);
        res.status(500).json({ error: "Erro ao atualizar estado" });
      }
    });

    /**
     * DELETE /estados/{id}
     * Remove (soft delete) um estado - atualiza o atributo Active para false
     */
    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const success = await this.service.remove(id);
        if (success) {
          res.status(204).send();
        } else {
          res.status(404).json({ error: "Estado não encontrado" });
        }
      } catch (error) {
        console.error("Erro ao remover estado:", error);
        res.status(500).json({ error: "Erro ao remover estado" });
      }
    });

    return router;
  }
}
