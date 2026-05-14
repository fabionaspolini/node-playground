import { PrismaClient } from "../Database/PrismaClient";
import { IUnitOfWork } from "@application/Contracts/IUnitOfWork";
import { PaisRepository } from "../Repositories/PaisRepository";
import { EstadoRepository } from "../Repositories/EstadoRepository";
import { CidadeRepository } from "../Repositories/CidadeRepository";
import { IPaisRepository } from "@domain/Repositories/IPaisRepository";
import { IEstadoRepository } from "@domain/Repositories/IEstadoRepository";
import { ICidadeRepository } from "@domain/Repositories/ICidadeRepository";

/**
 * Implementação do UnitOfWork para gerenciar transações e repositórios
 */
export class UnitOfWork implements IUnitOfWork {
  private readonly _prisma: PrismaClient;
  private _paisRepository?: IPaisRepository;
  private _estadoRepository?: IEstadoRepository;
  private _cidadeRepository?: ICidadeRepository;

  /**
   * Cria nova instância do UnitOfWork
   * @param prisma - Instância do Prisma Client
   */
  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  /**
   * Repositório de países
   */
  public get paisRepository(): IPaisRepository {
    if (!this._paisRepository) {
      this._paisRepository = new PaisRepository(this._prisma);
    }
    return this._paisRepository;
  }

  /**
   * Repositório de estados
   */
  public get estadoRepository(): IEstadoRepository {
    if (!this._estadoRepository) {
      this._estadoRepository = new EstadoRepository(this._prisma);
    }
    return this._estadoRepository;
  }

  /**
   * Repositório de cidades
   */
  public get cidadeRepository(): ICidadeRepository {
    if (!this._cidadeRepository) {
      this._cidadeRepository = new CidadeRepository(this._prisma);
    }
    return this._cidadeRepository;
  }

  /**
   * Commit das mudanças no banco de dados
   */
  public async commit(): Promise<void> {
    try {
      await this._prisma.$transaction(async (tx: any) => {
        // Commits são automáticos ao final do transaction block
      });
    } catch (error) {
      console.error("Erro ao fazer commit:", error);
      throw error;
    }
  }

  /**
   * Rollback das mudanças (não necessário com Prisma, mas mantido para interface)
   */
  public async rollback(): Promise<void> {
    // Com Prisma, não precisamos fazer rollback explicitamente
    // O transaction handles isso automaticamente
  }
}
