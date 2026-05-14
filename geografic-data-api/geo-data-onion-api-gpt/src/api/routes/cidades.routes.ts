import { FastifyInstance } from 'fastify';
import { prisma } from '../../infrastructure/database/prisma-client.js';
import { publishEvent } from '../../infrastructure/kafka/kafka-producer.js';
import { randomUUID } from 'crypto';

export async function cidadesRoutes(app: FastifyInstance) {
  app.post('/cidades', async function Create(request) {
    const result = await prisma.cidade.create({
      data: {
        ...(request.body as any),
        id: randomUUID()
      }
    });

    publishEvent('geografia.cidade', result.id, result);

    return result;
  });

  app.get('/cidades/:id', async function GetById(request) {
    return prisma.cidade.findUnique({ where: { id: (request.params as any).id } });
  });

  app.get('/cidades', async function List(request) {
    return prisma.cidade.findMany({ where: request.query as any });
  });

  app.put('/cidades/:id', async function Update(request) {
    const result = await prisma.cidade.update({
      where: { id: (request.params as any).id },
      data: request.body as any
    });

    publishEvent('geografia.cidade', result.id, result);

    return result;
  });

  app.delete('/cidades/:id', async function Remove(request) {
    const result = await prisma.cidade.update({
      where: { id: (request.params as any).id },
      data: { ativo: false }
    });

    publishEvent('geografia.cidade', result.id, result);

    return result;
  });
}