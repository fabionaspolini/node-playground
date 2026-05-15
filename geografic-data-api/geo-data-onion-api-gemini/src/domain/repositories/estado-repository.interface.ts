import { Estado } from "../entities/estado";

export interface IEstadoRepository {
  create(estado: Estado): Promise<Estado>;
  update(id: string, estado: Partial<Estado>): Promise<Estado>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Estado | null>;
  findAll(filters?: any): Promise<Estado[]>;
}
