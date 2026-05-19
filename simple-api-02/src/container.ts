import {PrismaClient} from "./generated/prisma/client.js";
import {asClass, asValue, type AwilixContainer, createContainer, Lifetime} from "awilix";
import {PrismaPg} from "@prisma/adapter-pg";
import {loadEnvFile} from "node:process";
import CidadeRepository from "./infra/repositories/cidade-repository.js";

loadEnvFile()

export default function initializeDi(container: AwilixContainer) {
    // Inicializa o cliente do banco de dados
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({connectionString})
    const prisma = new PrismaClient({adapter})

    // Registra a conexão do Prisma no container para gerenciar o ciclo de vida
    container.register({
        prisma: asValue(prisma), // singleton - prisma recomenda uso como singleton
        cidadeRepository: asClass(CidadeRepository).setLifetime(Lifetime.SINGLETON)
    });
}

/**
 * Configuração nomes e tipos para facilitar recuperação de instâncias em tempo de execução
 */
declare module '@fastify/awilix' {
    interface Cradle {
        prisma: PrismaClient
        cidadeRepository: CidadeRepository
    }
}