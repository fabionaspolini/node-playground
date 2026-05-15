import { Estado } from "../../domain/entities/estado";
import { IEstadoRepository } from "../../domain/repositories/estado-repository.interface";
import { prisma } from "../database/prisma-client";

export class PrismaEstadoRepository implements IEstadoRepository {
  async create(estado: Estado): Promise<Estado> {
    const created = await prisma.estado.create({
      data: {
        id: estado.id,
        paisId: estado.paisId,
        nome: estado.nome,
        sigla: estado.sigla,
        tipo: estado.tipo,
        ativo: estado.ativo,
      },
    });
    return new Estado(created);
  }

  async update(id: string, estado: Partial<Estado>): Promise<Estado> {
    const updated = await prisma.estado.update({
      where: { id },
      data: estado as any,
    });
    return new Estado(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.estado.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async findById(id: string): Promise<Estado | null> {
    const found = await prisma.estado.findUnique({
      where: { id },
    });
    return found ? new Estado(found) : null;
  }

  async findAll(filters?: any): Promise<Estado[]> {
    const found = await prisma.estado.findMany({
      where: filters,
    });
    return found.map((e) => new Estado(e));
  }
}
