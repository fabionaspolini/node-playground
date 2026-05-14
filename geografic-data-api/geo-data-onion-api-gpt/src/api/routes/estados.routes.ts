import { FastifyInstance } from 'fastify';
import { prisma } from '../../infrastructure/database/prisma-client.js';
import { publishEvent } from '../../infrastructure/kafka/kafka-producer.js';

export async function estadosRoutes(app: FastifyInstance) {
  app.post('/estados', async function Create(request) {
    const result = await prisma.estado.create({ data: request.body as any });
    publishEvent('geografia.estado', result.id, result);
    return result;
  });

  app.get('/estados/:id', async function GetById(request) {
    return prisma.estado.findUnique({ where: { id: (request.params as any).id } });
  });

  app.get('/estados', async function List(request) {
    return prisma.estado.findMany({ where: request.query as any });
  });

  app.put('/estados/:id', async function Update(request) {
    const result = await prisma.estado.update({
      where: { id: (request.params as any).id },
      data: request.body as any
    });

    publishEvent('geografia.estado', result.id, result);

    return result;
  });

  app.delete('/estados/:id', async function Remove(request) {
    const result = await prisma.estado.update({
      where: { id: (request.params as any).id },
      data: { ativo: false }
    });

    publishEvent('geografia.estado', result.id, result);

    return result;
  });
}