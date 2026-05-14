import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { loadEnvFile } from 'node:process';

import { paisesRoutes } from './routes/paises.routes.js';
import { estadosRoutes } from './routes/estados.routes.js';
import { cidadesRoutes } from './routes/cidades.routes.js';

loadEnvFile();

const app = Fastify({ logger: true });

await app.register(swagger, {
  openapi: {
    info: {
      title: 'Geografia API',
      version: '1.0.0'
    }
  }
});

await app.register(swaggerUi, {
  routePrefix: '/docs'
});

// await app.register(jwtAuthPlugin);

await app.register(paisesRoutes);
await app.register(estadosRoutes);
await app.register(cidadesRoutes);

app.listen({
  host: '0.0.0.0',
  port: 3000
});