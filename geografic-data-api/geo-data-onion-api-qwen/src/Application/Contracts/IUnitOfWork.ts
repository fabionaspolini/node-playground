/**
 * Interface para gerenciamento de transações de unidade de trabalho
 */
export interface IUnitOfWork {
  /**
   * Commit das mudanças no banco de dados
   */
  commit(): Promise<void>;

  /**
   * Rollback das mudanças
   */
  rollback(): Promise<void>;
}
