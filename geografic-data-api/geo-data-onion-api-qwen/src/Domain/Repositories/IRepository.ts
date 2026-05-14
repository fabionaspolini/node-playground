/**
 * Interface base para repositórios genéricos
 * @template T - Tipo da entidade
 * @template TId - Tipo do identificador da entidade
 */
export interface IRepository<T, TId> {
  /**
   * Encontra uma entidade pelo seu identificador
   * @param id - Identificador da entidade
   * @returns Promise com a entidade encontrada ou null
   */
  findById(id: TId): Promise<T | null>;

  /**
   * Encontra todas as entidades
   * @param filters - Filtros opcionais para a consulta
   * @returns Promise com array de entidades
   */
  findAll(filters?: Record<string, any>): Promise<T[]>;

  /**
   * Cria uma nova entidade
   * @param entity - Entidade a ser criada
   * @returns Promise com a entidade criada
   */
  create(entity: T): Promise<T>;

  /**
   * Atualiza uma entidade existente
   * @param entity - Entidade com os dados atualizados
   * @returns Promise com a entidade atualizada
   */
  update(entity: T): Promise<T>;

  /**
   * Remove uma entidade (soft delete - set active = false)
   * @param id - Identificador da entidade
   * @returns Promise boolean indicando sucesso
   */
  remove(id: TId): Promise<boolean>;

  /**
   * Salva uma entidade (create ou update)
   * @param entity - Entidade a ser salva
   * @returns Promise com a entidade salva
   */
  save(entity: T): Promise<T>;
}
