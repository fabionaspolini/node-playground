import { PrismaClient } from "@prisma/client";
import { Estado } from "@domain/Entities/Estado";
import { IEstadoRepository } from "@domain/Repositories/IEstadoRepository";

/**
 * Implementação do repositório de estados
 */
export class EstadoRepository implements IEstadoRepository {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async findById(id: string): Promise<Estado | null> {
    const entity = await this._prisma.estado.findUnique({
      where: { id }
    });

    return entity ? this.toDomain(entity) : null;
  }

  public async findAll(filters?: Record<string, any>): Promise<Estado[]> {
    const where: any = {};
    
    if (filters?.ativo !== undefined) {
      where.ativo = filters.ativo;
    }
    
    const entities = await this._prisma.estado.findMany({ where });
    return this.toDomainList(entities);
  }

  public async findActive(): Promise<Estado[]> {
    const entities = await this._prisma.estado.findMany({
      where: { ativo: true }
    });
    return this.toDomainList(entities);
  }

  public async findByPaisId(paisId: string): Promise<Estado[]> {
    const entities = await this._prisma.estado.findMany({
      where: { pais_id: paisId, ativo: true }
    });
    return this.toDomainList(entities);
  }

  public async findByFilters(filters: Partial<Estado>): Promise<Estado[]> {
    const where: any = {};
    
    if (filters.ativo !== undefined) {
      where.ativo = filters.ativo;
    }
    
    if (filters.paisId !== undefined) {
      where.pais_id = filters.paisId;
    }
    
    if (filters.nome !== undefined) {
      where.nome = { contains: filters.nome, mode: "insensitive" };
    }
    
    if (filters.sigla !== undefined) {
      where.sigla = filters.sigla;
    }
    
    if (filters.tipo !== undefined) {
      where.tipo = filters.tipo;
    }
    
    const entities = await this._prisma.estado.findMany({ where });
    return this.toDomainList(entities);
  }

  public async create(entity: Estado): Promise<Estado> {
    const created = await this._prisma.estado.create({
      data: this.toPrismaData(entity)
    });
    return this.toDomain(created);
  }

  public async update(entity: Estado): Promise<Estado> {
    const updated = await this._prisma.estado.update({
      where: { id: entity.id },
      data: this.toPrismaData(entity)
    });
    return this.toDomain(updated);
  }

  public async remove(id: string): Promise<boolean> {
    const entity = await this._prisma.estado.findUnique({
      where: { id }
    });

    if (!entity) {
      return false;
    }

    await this._prisma.estado.update({
      where: { id },
      data: { ativo: false }
    });

    return true;
  }

  public async save(entity: Estado): Promise<Estado> {
    const existing = await this.findById(entity.id);
    
    if (existing) {
      return this.update(entity);
    }
    
    return this.create(entity);
  }

  private toDomain(entity: any): Estado {
    return new Estado({
      id: entity.id,
      paisId: entity.pais_id,
      nome: entity.nome,
      sigla: entity.sigla,
      tipo: entity.tipo,
      ativo: entity.ativo,
      createdAt: entity.created_at ? new Date(entity.created_at) : undefined,
      updatedAt: entity.updated_at ? new Date(entity.updated_at) : undefined
    });
  }

  private toDomainList(entities: any[]): Estado[] {
    return entities.map(entity => this.toDomain(entity));
  }

  private toPrismaData(entity: Estado): any {
    return {
      id: entity.id,
      pais_id: entity.paisId,
      nome: entity.nome,
      sigla: entity.sigla,
      tipo: entity.tipo,
      ativo: entity.ativo
    };
  }
}
