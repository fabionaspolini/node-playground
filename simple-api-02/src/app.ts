import Fastify from 'fastify';
import cidadeRouter from "./routers/cidade-router.js";
import {container, type ContainerCradle} from "./container.js";

const fastify = Fastify({ logger: true });
fastify.register(cidadeRouter, { prefix: "/cidades" })

// Hook do Fastify para fechar a conexão com o banco de forma segura quando o app desligar
fastify.addHook('onClose', async () => {
    const { prisma } = container.cradle as ContainerCradle;
    await prisma.$disconnect();
    console.log('Conexão com o PostgreSQL encerrada com sucesso.');
});

// Inicialização do Servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('API de Cidades rodando em http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
