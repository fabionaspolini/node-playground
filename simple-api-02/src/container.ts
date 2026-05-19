import {PrismaClient} from "./generated/prisma/client.js";
import {asValue, createContainer} from "awilix";
import {PrismaPg} from "@prisma/adapter-pg";
import {loadEnvFile} from "node:process";

loadEnvFile()

// Inicializa o cliente do banco de dados
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter})

// Cria o container de DI usando o modo PROXY (maior compatibilidade com TS)
const container = createContainer({
    injectionMode: "PROXY"
})

// Registra a conexão do Prisma no container para gerenciar o ciclo de vida
container.register({
    prisma: asValue(prisma) // singleton - prisma recomenda uso como singleton
});

// Tipagem para ajudar o TypeScript a autocompletar as dependências
export interface ContainerCradle {
    prisma: PrismaClient;
}

export {container}