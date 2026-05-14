import { CidadeService } from "../../Application/Services/CidadeService";
import { EntityExtensions } from "../../Application/Extensions/EntityExtensions";
import { Cidade } from "../../Domain/Entities/Cidade";
import { ICidadeCreateRequest, ICidadeResponse, ICidadeUpdateRequest } from "../../Application/Dtos/CidadeDto";

/**
 * Controller para gerenciar operações de cidades
 */
export class CidadeController {
  private readonly _service: CidadeService;

  /**
   * Cria nova instância do controller de cidades
   * @param service - Serviço de cidades
   */
  constructor(service: CidadeService) {
    this._service = service;
  }

  /**
   * Cria uma nova cidade (POST /cidades)
   * @param request - Requisição com dados da cidade
   * @returns Cidade criada
   */
  public async Create(request: ICidadeCreateRequest): Promise<ICidadeResponse> {
    const entity = EntityExtensions.toCidadeEntity(request);
    const created = await this._service.create(entity);
    return EntityExtensions.toCidadeResponseDto(created);
  }

  /**
   * Busca uma cidade pelo ID (GET /cidades/{id})
   * @param id - ID da cidade
   * @returns Cidade encontrada
   */
  public async GetById(id: string): Promise<ICidadeResponse | null> {
    const entity = await this._service.getById(id);
    return entity ? EntityExtensions.toCidadeResponseDto(entity) : null;
  }

  /**
   * Lista todas as cidades (GET /cidades)
   * @param filters - Filtros opcionais
   * @returns Lista de cidades
   */
  public async List(filters?: Record<string, any>): Promise<ICidadeResponse[]> {
    const ativo = filters?.ativo;
    const entities = await this._service.list(ativo);
    return EntityExtensions.toCidadeResponseDtoList(entities);
  }

  /**
   * Atualiza uma cidade existente (PUT /cidades)
   * @param request - Requisição com dados atualizados
   * @returns Cidade atualizada
   */
  public async Update(request: ICidadeUpdateRequest): Promise<ICidadeResponse> {
    const entity = EntityExtensions.toCidadeEntity(request);
    const updated = await this._service.update(entity);
    return EntityExtensions.toCidadeResponseDto(updated);
  }

  /**
   * Remove (soft delete) uma cidade (DELETE /cidades/{id})
   * @param id - ID da cidade
   * @returns true se removida com sucesso
   */
  public async Remove(id: string): Promise<boolean> {
    return this._service.remove(id);
  }

  /**
   * Busca cidades por filtros
   * @param filters - Filtros
   * @returns Lista de cidades filtradas
   */
  public async FindByFilters(filters: Record<string, any>): Promise<ICidadeResponse[]> {
    const cidadeFilters: Partial<Cidade> = {
      nome: filters.nome,
      códigoPostal: filters.codigo_postal,
      ativo: filters.ativo !== undefined ? filters.ativo === "true" : undefined
    };
    const entities = await this._service.findByFilters(cidadeFilters);
    return EntityExtensions.toCidadeResponseDtoList(entities);
  }
}
