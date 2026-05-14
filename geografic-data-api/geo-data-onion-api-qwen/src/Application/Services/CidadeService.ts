import { Cidade } from "../../Domain/Entities/Cidade";
import { ICidadeRepository } from "../../Domain/Repositories/ICidadeRepository";

/**
 * Serviço para gerenciar operações de negócio de cidades
 */
export class CidadeService {
  private readonly _repository: ICidadeRepository;

  /**
   * Cria uma nova instância do serviço de Cidade
   * @param repository - Repositório de cidades
   */
  constructor(repository: ICidadeRepository) {
    this._repository = repository;
  }

  /**
   * Lista todas as cidades
   * @param ativo - Filtra por cidade ativa (opcional)
   * @returns Lista de cidades
   */
  public async list(ativo?: boolean): Promise<Cidade[]> {
    if (ativo !== undefined) {
      return this._repository.findByFilters({ ativo });
    }
    return this._repository.findAll();
  }

  /**
   * Lista cidades de um estado específico
   * @param estadoId - ID do estado
   * @returns Lista de cidades do estado
   */
  public async listByEstadoId(estadoId: string): Promise<Cidade[]> {
    return this._repository.findByEstadoId(estadoId);
  }

  /**
   * Lista cidades de um país específico (através do estado)
   * @param paisId - ID do país
   * @returns Lista de cidades do país
   */
  public async listByPaisId(paisId: string): Promise<Cidade[]> {
    return this._repository.findByPaisId(paisId);
  }

  /**
   * Busca uma cidade pelo ID
   * @param id - ID da cidade (UUID)
   * @returns Cidade encontrada ou null
   */
  public async getById(id: string): Promise<Cidade | null> {
    return this._repository.findById(id);
  }

  /**
   * Cria uma nova cidade
   * @param cidade - Dados da cidade
   * @returns Cidade criada
   */
  public async create(cidade: Cidade): Promise<Cidade> {
    return this._repository.create(cidade);
  }

  /**
   * Atualiza uma cidade existente
   * @param cidade - Dados atualizados da cidade
   * @returns Cidade atualizada
   */
  public async update(cidade: Cidade): Promise<Cidade> {
    const existing = await this._repository.findById(cidade.id);
    if (!existing) {
      throw new Error(`Cidade com ID ${cidade.id} não encontrada`);
    }
    return this._repository.update(cidade);
  }

  /**
   * Remove (soft delete) uma cidade
   * @param id - ID da cidade
   * @returns true se removida com sucesso
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
   * Busca cidades por filtros
   * @param filters - Filtros (nome, codigoPostal, ativo, etc.)
   * @returns Lista de cidades filtradas
   */
  public async findByFilters(filters: Partial<Cidade>): Promise<Cidade[]> {
    return this._repository.findByFilters(filters);
  }
}
