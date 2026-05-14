import { Cidade } from "../Entities/Cidade";
import { IRepository } from "./IRepository";

/**
 * Interface do repositório para entidades Cidade
 */
export interface ICidadeRepository extends IRepository<Cidade, string> {
  /**
   * Encontra cidades ativas
   * @returns Promise com array de cidades ativas
   */
  findActive(): Promise<Cidade[]>;

  /**
   * Encontra cidades por estado
   * @param estadoId - ID do estado
   * @returns Promise com array de cidades
   */
  findByEstadoId(estadoId: string): Promise<Cidade[]>;

  /**
   * Encontra cidades por filtro
   * @param filters - Filtros (nome, codigoPostal, ativo, etc.)
   * @returns Promise com array de cidades
   */
  findByFilters(filters: Partial<Cidade>): Promise<Cidade[]>;

  /**
   * Encontra cidades por país (através do estado)
   * @param paisId - ID do país
   * @returns Promise com array de cidades
   */
  findByPaisId(paisId: string): Promise<Cidade[]>;
}
