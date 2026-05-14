import { Pais } from "../../Domain/Entities/Pais";
import { IPaisRepository } from "../../Domain/Repositories/IPaisRepository";

/**
 * Serviço para gerenciar operações de negócio de países
 */
export class PaisService {
  private readonly _repository: IPaisRepository;

  /**
   * Cria uma nova instância do serviço de País
   * @param repository - Repositório de países
   */
  constructor(repository: IPaisRepository) {
    this._repository = repository;
  }

  /**
   * Lista todos os países
   * @param ativo - Filtra por país ativo (opcional)
   * @returns Lista de países
   */
  public async list(ativo?: boolean): Promise<Pais[]> {
    if (ativo !== undefined) {
      return this._repository.findByFilters({ ativo });
    }
    return this._repository.findAll();
  }

  /**
   * Busca um país pelo ID
   * @param id - ID do país (ISO 3166-1 alpha-2)
   * @returns País encontrado ou null
   */
  public async getById(id: string): Promise<Pais | null> {
    return this._repository.findById(id);
  }

  /**
   * Cria um novo país
   * @param pais - Dados do país
   * @returns País criado
   */
  public async create(pais: Pais): Promise<Pais> {
    return this._repository.create(pais);
  }

  /**
   * Atualiza um país existente
   * @param pais - Dados atualizados do país
   * @returns País atualizado
   */
  public async update(pais: Pais): Promise<Pais> {
    const existing = await this._repository.findById(pais.id);
    if (!existing) {
      throw new Error(`País com ID ${pais.id} não encontrado`);
    }
    return this._repository.update(pais);
  }

  /**
   * Remove (soft delete) um país
   * @param id - ID do país
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
   * Busca países por filtros
   * @param filters - Filtros (nome, ativo, etc.)
   * @returns Lista de países filtrados
   */
  public async findByFilters(filters: Partial<Pais>): Promise<Pais[]> {
    return this._repository.findByFilters(filters);
  }
}
