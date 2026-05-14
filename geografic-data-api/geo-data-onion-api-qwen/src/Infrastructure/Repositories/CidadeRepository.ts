import { PrismaClient } from "@prisma/client";
import { Cidade } from "@domain/Entities/Cidade";
import { ICidadeRepository } from "@domain/Repositories/ICidadeRepository";

/**
 * Implementação do repositório de cidades
 */
export class CidadeRepository implements ICidadeRepository {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async findById(id: string): Promise<Cidade | null> {
    const entity = await this._prisma.cidade.findUnique({
      where: { id }
    });

    return entity ? this.toDomain(entity) : null;
  }

  public async findAll(filters?: Record<string, any>): Promise<Cidade[]> {
    const where: any = {};
    
    if (filters?.ativo !== undefined) {
      where.ativo = filters.ativo;
    }
    
    const entities = await this._prisma.cidade.findMany({ where });
    return this.toDomainList(entities);
  }

  public async findActive(): Promise<Cidade[]> {
    const entities = await this._prisma.cidade.findMany({
      where: { ativo: true }
    });
    return this.toDomainList(entities);
  }

  public async findByEstadoId(estadoId: string): Promise<Cidade[]> {
    const entities = await this._prisma.cidade.findMany({
      where: { estado_id: estadoId, ativo: true }
    });
    return this.toDomainList(entities);
  }

  public async findByFilters(filters: Partial<Cidade>): Promise<Cidade[]> {
    const where: any = {};
    
    if (filters.ativo !== undefined) {
      where.ativo = filters.ativo;
    }
    
    if (filters.nome !== undefined) {
      where.nome = { contains: filters.nome, mode: "insensitive" };
    }
    
    if (filters.codigoPostal !== undefined) {
      where.codigo_postal = { contains: filters.codigoPostal, mode: "insensitive" };
    }
    
    const entities = await this._prisma.cidade.findMany({ where });
    return this.toDomainList(entities);
  }

  public async findByPaisId(paisId: string): Promise<Cidade[]> {
    const entities = await this._prisma.cidade.findMany({
      where: {
        estado: {
          pais_id: paisId
        },
        ativo: true
      }
    });
    return this.toDomainList(entities);
  }

  public async create(entity: Cidade): Promise<Cidade> {
    const created = await this._prisma.cidade.create({
      data: this.toPrismaData(entity)
    });
    return this.toDomain(created);
  }

  public async update(entity: Cidade): Promise<Cidade> {
    const updated = await this._prisma.cidade.update({
      where: { id: entity.id },
      data: this.toPrismaData(entity)
    });
    return this.toDomain(updated);
  }

  public async remove(id: string): Promise<boolean> {
    const entity = await this._prisma.cidade.findUnique({
      where: { id }
    });

    if (!entity) {
      return false;
    }

    await this._prisma.cidade.update({
      where: { id },
      data: { ativo: false }
    });

    return true;
  }

  public async save(entity: Cidade): Promise<Cidade> {
    const existing = await this.findById(entity.id);
    
    if (existing) {
      return this.update(entity);
    }
    
    return this.create(entity);
  }

  private toDomain(entity: any): Cidade {
    return new Cidade({
      id: entity.id,
      estadoId: entity.estado_id,
      nome: entity.nome,
      codigoPostal: entity.codigo_postal,
      latitude: entity.latitude ? Number(entity.latitude) : undefined,
      longitude: entity.longitude ? Number(entity.longitude) : undefined,
      ativo: entity.ativo,
      createdAt: entity.created_at ? new Date(entity.created_at) : undefined,
      updatedAt: entity.updated_at ? new Date(entity.updated_at) : undefined
    });
  }

  private toDomainList(entities: any[]): Cidade[] {
    return entities.map(entity => this.toDomain(entity));
  }

  private toPrismaData(entity: Cidade): any {
    return {
      id: entity.id,
      estado_id: entity.estadoId,
      nome: entity.nome,
      codigo_postal: entity.codigoPostal,
      latitude: entity.latitude,
      longitude: entity.longitude,
      ativo: entity.ativo
    };
  }
}
