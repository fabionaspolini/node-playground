import { Estado } from "../../Domain/Entities/Estado";
import { IEstadoRepository } from "../../Domain/Repositories/IEstadoRepository";

/**
 * Serviço para gerenciar operações de negócio de estados
 */
export class EstadoService {
  private readonly _repository: IEstadoRepository;

  /**
   * Cria uma nova instância do serviço de Estado
   * @param repository - Repositório de estados
   */
  constructor(repository: IEstadoRepository) {
    this._repository = repository;
  }

  /**
   * Lista todos os estados
   * @param ativo - Filtra por estado ativo (opcional)
   * @returns Lista de estados
   */
  public async list(ativo?: boolean): Promise<Estado[]> {
    if (ativo !== undefined) {
      return this._repository.findByFilters({ ativo });
    }
    return this._repository.findAll();
  }

  /**
   * Lista estados de um país específico
   * @param paisId - ID do país
   * @returns Lista de estados do país
   */
  public async listByPaisId(paisId: string): Promise<Estado[]> {
    return this._repository.findByPaisId(paisId);
  }

  /**
   * Busca um estado pelo ID
   * @param id - ID do estado (ISO 3166-2)
   * @returns Estado encontrado ou null
   */
  public async getById(id: string): Promise<Estado | null> {
    return this._repository.findById(id);
  }

  /**
   * Cria um novo estado
   * @param estado - Dados do estado
   * @returns Estado criado
   */
  public async create(estado: Estado): Promise<Estado> {
    return this._repository.create(estado);
  }

  /**
   * Atualiza um estado existente
   * @param estado - Dados atualizados do estado
   * @returns Estado atualizado
   */
  public async update(estado: Estado): Promise<Estado> {
    const existing = await this._repository.findById(estado.id);
    if (!existing) {
      throw new Error(`Estado com ID ${estado.id} não encontrado`);
    }
    return this._repository.update(estado);
  }

  /**
   * Remove (soft delete) um estado
   * @param id - ID do estado
   * @returns true se removido com sucesso
   */
  public async remove(id: string): Promise<boolean> {
    const existing = await this._repository.findById(id);
    if (!existing) {
      return false;
    }
    existing.desativar();
    await this._repository.update(existing);
    return true;
  }

  /**
   * Busca estados por filtros
   * @param filters - Filtros (nome, sigla, tipo, ativo, etc.)
   * @returns Lista de estados filtrados
   */
  public async findByFilters(filters: Partial<Estado>): Promise<Estado[]> {
    return this._repository.findByFilters(filters);
  }
}
