import { Cidade } from "../entities/cidade";

export interface ICidadeRepository {
  create(cidade: Cidade): Promise<Cidade>;
  update(id: string, cidade: Partial<Cidade>): Promise<Cidade>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Cidade | null>;
  findAll(filters?: any): Promise<Cidade[]>;
}
