import { Cidade } from "../../domain/entities/cidade";
import { ICidadeRepository } from "../../domain/repositories/cidade-repository.interface";
import { prisma } from "../database/prisma-client";
import { Prisma } from "@prisma/client";

export class PrismaCidadeRepository implements ICidadeRepository {
  async create(cidade: Cidade): Promise<Cidade> {
    const created = await prisma.cidade.create({
      data: {
        id: cidade.id,
        estadoId: cidade.estadoId,
        nome: cidade.nome,
        codigoPostal: cidade.codigoPostal,
        latitude: new Prisma.Decimal(cidade.latitude),
        longitude: new Prisma.Decimal(cidade.longitude),
        ativo: cidade.ativo,
      },
    });
    return new Cidade({
      ...created,
      latitude: created.latitude.toNumber(),
      longitude: created.longitude.toNumber(),
    });
  }

  async update(id: string, cidade: Partial<Cidade>): Promise<Cidade> {
    const data: any = { ...cidade };
    if (cidade.latitude !== undefined) data.latitude = new Prisma.Decimal(cidade.latitude);
    if (cidade.longitude !== undefined) data.longitude = new Prisma.Decimal(cidade.longitude);

    const updated = await prisma.cidade.update({
      where: { id },
      data,
    });
    return new Cidade({
      ...updated,
      latitude: updated.latitude.toNumber(),
      longitude: updated.longitude.toNumber(),
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.cidade.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async findById(id: string): Promise<Cidade | null> {
    const found = await prisma.cidade.findUnique({
      where: { id },
    });
    if (!found) return null;
    return new Cidade({
      ...found,
      latitude: found.latitude.toNumber(),
      longitude: found.longitude.toNumber(),
    });
  }

  async findAll(filters?: any): Promise<Cidade[]> {
    const found = await prisma.cidade.findMany({
      where: filters,
    });
    return found.map(
      (c) =>
        new Cidade({
          ...c,
          latitude: c.latitude.toNumber(),
          longitude: c.longitude.toNumber(),
        })
    );
  }
}
