import { FastifyInstance } from 'fastify';
import { prisma } from '../../infrastructure/database/prisma-client.js';
import { publishEvent } from '../../infrastructure/kafka/kafka-producer.js';

export async function paisesRoutes(app: FastifyInstance) {

  app.post('/paises', async function Create(request) {
    const body = request.body as any;
    const result = await prisma.pais.create({ data: body });

    publishEvent('geografia.pais', result.id, result);

    return result;
  });

  app.get('/paises/:id', async function GetById(request) {
    const { id } = request.params as any;
    return prisma.pais.findUnique({ where: { id } });
  });

  app.get('/paises', async function List(request) {
    const query = request.query as any;
    return prisma.pais.findMany({ where: query });
  });

  app.put('/paises/:id', async function Update(request) {
    const { id } = request.params as any;
    const body = request.body as any;

    const result = await prisma.pais.update({
      where: { id },
      data: body
    });

    publishEvent('geografia.pais', result.id, result);

    return result;
  });

  app.delete('/paises/:id', async function Remove(request) {
    const { id } = request.params as any;

    const result = await prisma.pais.update({
      where: { id },
      data: { ativo: false }
    });

    publishEvent('geografia.pais', result.id, result);

    return result;
  });
}