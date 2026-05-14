import { Estado } from "../Entities/Estado";
import { IRepository } from "./IRepository";

/**
 * Interface do repositório para entidades Estado
 */
export interface IEstadoRepository extends IRepository<Estado, string> {
  /**
   * Encontra estados ativos
   * @returns Promise com array de estados ativos
   */
  findActive(): Promise<Estado[]>;

  /**
   * Encontra estados por país
   * @param paisId - ID do país
   * @returns Promise com array de estados
   */
  findByPaisId(paisId: string): Promise<Estado[]>;

  /**
   * Encontra estado pelo código ISO 3166-2
   * @param id - Código ISO (ex: "BR-SP", "US-AK")
   * @returns Promise com estado encontrado ou null
   */
  findById(id: string): Promise<Estado | null>;

  /**
   * Encontra estados por filtro
   * @param filters - Filtros (nome, sigla, tipo, ativo, etc.)
   * @returns Promise com array de estados
   */
  findByFilters(filters: Partial<Estado>): Promise<Estado[]>;
}
