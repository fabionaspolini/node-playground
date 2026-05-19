import Fastify from 'fastify';
import cidadeRouter from "./routers/cidade-router.js";

const fastify = Fastify({ logger: true });
fastify.register(cidadeRouter, { prefix: "/cidades" })

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
