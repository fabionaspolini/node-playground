import { Pais } from "../Entities/Pais";
import { IRepository } from "./IRepository";

/**
 * Interface do repositório para entidades Pais
 */
export interface IPaisRepository extends IRepository<Pais, string> {
  /**
   * Encontra países ativos
   * @returns Promise com array de países ativos
   */
  findActive(): Promise<Pais[]>;

  /**
   * Encontra país pelo código ISO 3166-1 alpha-2
   * @param id - Código ISO (ex: "BR", "US")
   * @returns Promise com país encontrado ou null
   */
  findById(id: string): Promise<Pais | null>;

  /**
   * Encontra países por filtro
   * @param filters - Filtros (nome, ativo, etc.)
   * @returns Promise com array de países
   */
  findByFilters(filters: Partial<Pais>): Promise<Pais[]>;
}
