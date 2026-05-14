import { PrismaClient } from "@prisma/client";
import { Pais } from "@domain/Entities/Pais";
import { IPaisRepository } from "@domain/Repositories/IPaisRepository";

/**
 * Implementação do repositório de países
 */
export class PaisRepository implements IPaisRepository {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  public async findById(id: string): Promise<Pais | null> {
    const entity = await this._prisma.pais.findUnique({
      where: { id }
    });

    return entity ? this.toDomain(entity) : null;
  }

  public async findAll(filters?: Record<string, any>): Promise<Pais[]> {
    const where: any = {};
    
    if (filters?.ativo !== undefined) {
      where.ativo = filters.ativo;
    }
    
    const entities = await this._prisma.pais.findMany({ where });
    return this.toDomainList(entities);
  }

  public async findActive(): Promise<Pais[]> {
    const entities = await this._prisma.pais.findMany({
      where: { ativo: true }
    });
    return this.toDomainList(entities);
  }

  public async findByFilters(filters: Partial<Pais>): Promise<Pais[]> {
    const where: any = {};
    
    if (filters.ativo !== undefined) {
      where.ativo = filters.ativo;
    }
    
    const entities = await this._prisma.pais.findMany({ where });
    return this.toDomainList(entities);
  }

  public async create(entity: Pais): Promise<Pais> {
    const created = await this._prisma.pais.create({
      data: this.toPrismaData(entity)
    });
    return this.toDomain(created);
  }

  public async update(entity: Pais): Promise<Pais> {
    const updated = await this._prisma.pais.update({
      where: { id: entity.id },
      data: this.toPrismaData(entity)
    });
    return this.toDomain(updated);
  }

  public async remove(id: string): Promise<boolean> {
    const entity = await this._prisma.pais.findUnique({
      where: { id }
    });

    if (!entity) {
      return false;
    }

    await this._prisma.pais.update({
      where: { id },
      data: { ativo: false }
    });

    return true;
  }

  public async save(entity: Pais): Promise<Pais> {
    const existing = await this.findById(entity.id);
    
    if (existing) {
      return this.update(entity);
    }
    
    return this.create(entity);
  }

  private toDomain(entity: any): Pais {
    return new Pais({
      id: entity.id,
      nome: entity.nome,
      códigoISO3: entity.codigo_iso_3,
      códigoONU: entity.codigo_onu,
      códigoDDI: entity.codigo_ddi,
      códigoMoeda: entity.codigo_moeda,
      defaultLocale: entity.default_locale,
      ativo: entity.ativo,
      createdAt: entity.created_at ? new Date(entity.created_at) : undefined,
      updatedAt: entity.updated_at ? new Date(entity.updated_at) : undefined
    });
  }

  private toDomainList(entities: any[]): Pais[] {
    return entities.map(entity => this.toDomain(entity));
  }

  private toPrismaData(entity: Pais): any {
    return {
      id: entity.id,
      nome: entity.nome,
      codigo_iso_3: entity.códigoISO3,
      codigo_onu: entity.códigoONU,
      codigo_ddi: entity.códigoDDI,
      codigo_moeda: entity.códigoMoeda,
      default_locale: entity.defaultLocale,
      ativo: entity.ativo
    };
  }
}
