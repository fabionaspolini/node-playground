import { Pais } from "../../domain/entities/pais";
import { IPaisRepository } from "../../domain/repositories/pais-repository.interface";
import { prisma } from "../database/prisma-client";

export class PrismaPaisRepository implements IPaisRepository {
  async create(pais: Pais): Promise<Pais> {
    const created = await prisma.pais.create({
      data: {
        id: pais.id,
        nome: pais.nome,
        codigoISO3: pais.codigoISO3,
        codigoONU: pais.codigoONU,
        codigoDDI: pais.codigoDDI,
        codigoMoeda: pais.codigoMoeda,
        defaultLocale: pais.defaultLocale,
        ativo: pais.ativo,
      },
    });
    return new Pais(created);
  }

  async update(id: string, pais: Partial<Pais>): Promise<Pais> {
    const updated = await prisma.pais.update({
      where: { id },
      data: pais as any,
    });
    return new Pais(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.pais.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async findById(id: string): Promise<Pais | null> {
    const found = await prisma.pais.findUnique({
      where: { id },
    });
    return found ? new Pais(found) : null;
  }

  async findAll(filters?: any): Promise<Pais[]> {
    const found = await prisma.pais.findMany({
      where: filters,
    });
    return found.map((p) => new Pais(p));
  }
}
