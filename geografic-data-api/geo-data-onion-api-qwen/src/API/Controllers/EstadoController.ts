import { EstadoService } from "../../Application/Services/EstadoService";
import { EntityExtensions } from "../../Application/Extensions/EntityExtensions";
import { Estado } from "../../Domain/Entities/Estado";
import { IEstadoCreateRequest, IEstadoResponse, IEstadoUpdateRequest } from "../../Application/Dtos/EstadoDto";

/**
 * Controller para gerenciar operações de estados
 */
export class EstadoController {
  private readonly _service: EstadoService;

  /**
   * Cria nova instância do controller de estados
   * @param service - Serviço de estados
   */
  constructor(service: EstadoService) {
    this._service = service;
  }

  /**
   * Cria um novo estado (POST /estados)
   * @param request - Requisição com dados do estado
   * @returns State criado
   */
  public async Create(request: IEstadoCreateRequest): Promise<IEstadoResponse> {
    const entity = EntityExtensions.toEstadoEntity(request);
    const created = await this._service.create(entity);
    return EntityExtensions.toEstadoResponseDto(created);
  }

  /**
   * Busca um estado pelo ID (GET /estados/{id})
   * @param id - ID do estado
   * @returns State encontrado
   */
  public async GetById(id: string): Promise<IEstadoResponse | null> {
    const entity = await this._service.getById(id);
    return entity ? EntityExtensions.toEstadoResponseDto(entity) : null;
  }

  /**
   * Lista todos os estados (GET /estados)
   * @param filters - Filtros opcionais
   * @returns Lista de estados
   */
  public async List(filters?: Record<string, any>): Promise<IEstadoResponse[]> {
    const ativo = filters?.ativo;
    const entities = await this._service.list(ativo);
    return EntityExtensions.toEstadoResponseDtoList(entities);
  }

  /**
   * Atualiza um estado existente (PUT /estados)
   * @param request - Requisição com dados atualizados
   * @returns State atualizado
   */
  public async Update(request: IEstadoUpdateRequest): Promise<IEstadoResponse> {
    const entity = EntityExtensions.toEstadoEntity(request);
    const updated = await this._service.update(entity);
    return EntityExtensions.toEstadoResponseDto(updated);
  }

  /**
   * Remove (soft delete) um estado (DELETE /estados/{id})
   * @param id - ID do estado
   * @returns true se removido com sucesso
   */
  public async Remove(id: string): Promise<boolean> {
    return this._service.remove(id);
  }

  /**
   * Busca estados por filtros
   * @param filters - Filtros
   * @returns Lista de estados filtrados
   */
  public async FindByFilters(filters: Record<string, any>): Promise<IEstadoResponse[]> {
    const estadoFilters: Partial<Estado> = {
      nome: filters.nome,
      sigla: filters.sigla,
      tipo: filters.tipo,
      ativo: filters.ativo !== undefined ? filters.ativo === "true" : undefined
    };
    const entities = await this._service.findByFilters(estadoFilters);
    return EntityExtensions.toEstadoResponseDtoList(entities);
  }
}
