import { Pais } from "../entities/pais";

export interface IPaisRepository {
  create(pais: Pais): Promise<Pais>;
  update(id: string, pais: Partial<Pais>): Promise<Pais>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Pais | null>;
  findAll(filters?: any): Promise<Pais[]>;
}
