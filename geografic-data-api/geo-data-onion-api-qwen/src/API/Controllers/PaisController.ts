import { PaisService } from "../../Application/Services/PaisService";
import { EntityExtensions } from "../../Application/Extensions/EntityExtensions";
import { Pais } from "../../Domain/Entities/Pais";
import { IPaisCreateRequest, IPaisResponse, IPaisUpdateRequest } from "../../Application/Dtos/PaisDto";

/**
 * Controller para gerenciar operações de países
 */
export class PaisController {
  private readonly _service: PaisService;

  /**
   * Cria nova instância do controller de países
   * @param service - Serviço de países
   */
  constructor(service: PaisService) {
    this._service = service;
  }

  /**
   * Cria um novo país (POST /cidades)
   * @param request - Requisição com dados do país
   * @returns Country criado
   */
  public async Create(request: IPaisCreateRequest): Promise<IPaisResponse> {
    const entity = EntityExtensions.toPaisEntity(request);
    const created = await this._service.create(entity);
    return EntityExtensions.toPaisResponseDto(created);
  }

  /**
   * Busca um país pelo ID (GET /cidades/{id})
   * @param id - ID do país
   * @returns Country encontrado
   */
  public async GetById(id: string): Promise<IPaisResponse | null> {
    const entity = await this._service.getById(id);
    return entity ? EntityExtensions.toPaisResponseDto(entity) : null;
  }

  /**
   * Lista todos os países (GET /cidades)
   * @param filters - Filtros opcionais
   * @returns Lista de países
   */
  public async List(filters?: Record<string, any>): Promise<IPaisResponse[]> {
    const ativo = filters?.ativo;
    const entities = await this._service.list(ativo);
    return EntityExtensions.toPaisResponseDtoList(entities);
  }

  /**
   * Atualiza um país existente (PUT /cidades)
   * @param request - Requisição com dados atualizados
   * @returns Country atualizado
   */
  public async Update(request: IPaisUpdateRequest): Promise<IPaisResponse> {
    const entity = EntityExtensions.toPaisEntity(request);
    const updated = await this._service.update(entity);
    return EntityExtensions.toPaisResponseDto(updated);
  }

  /**
   * Remove (soft delete) um país (DELETE /cidades/{id})
   * @param id - ID do país
   * @returns true se removido com sucesso
   */
  public async Remove(id: string): Promise<boolean> {
    return this._service.remove(id);
  }

  /**
   * Busca países por filtros
   * @param filters - Filtros
   * @returns Lista de países filtrados
   */
  public async FindByFilters(filters: Record<string, any>): Promise<IPaisResponse[]> {
    const paisFilters: Partial<Pais> = {
      nome: filters.nome,
      ativo: filters.ativo !== undefined ? filters.ativo === "true" : undefined
    };
    const entities = await this._service.findByFilters(paisFilters);
    return EntityExtensions.toPaisResponseDtoList(entities);
  }
}
