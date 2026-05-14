import { PrismaClient as DBClient } from "@prisma/client";

/**
 * Alias para PrismaClient
 */
export class PrismaClient extends DBClient {}

/**
 * Contexto do banco de dados utilizando Prisma
 */
export class DatabaseContext {
  /**
   * Instância do Prisma Client
   */
  public readonly prisma: PrismaClient;

  /**
   * Cria uma nova instância do DatabaseContext
   */
  constructor() {
    this.prisma = new PrismaClient({
      log: ["query", "error", "warn"]
    });
  }

  /**
   * Inicializa o contexto do banco de dados
   */
  public async initialize(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log("Conectado ao banco de dados com sucesso");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
      throw error;
    }
  }

  /**
   * Desconecta do banco de dados
   */
  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log("Desconectado do banco de dados");
    } catch (error) {
      console.error("Erro ao desconectar do banco de dados:", error);
    }
  }
}
