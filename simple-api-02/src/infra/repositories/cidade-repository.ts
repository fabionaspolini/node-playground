import type {Cidade} from "../../models/cidade.js";
import {Prisma, type PrismaClient} from "../../generated/prisma/client.js";
import type {DbOperationResult} from "./types.js";
import type {CidadeCreateInput, CidadeUpdateInput} from "../../generated/prisma/models/Cidade.js";
import type {Cradle} from "@fastify/awilix";


export default class CidadeRepository {
    prisma: PrismaClient;
    
    constructor({ prisma }: Cradle) {
        this.prisma = prisma;
    }
    
    list(): Promise<Cidade[]> {
        return this.prisma.cidade.findMany();
    }
    
    get(id: number): Promise<Cidade | null> {
        return this.prisma.cidade.findUnique({ where: { id } });
    }
    
    create(value: CidadeCreateInput): Promise<Cidade> {
        return this.prisma.cidade.create({data: value})
    }
    
    async update(id: number, value: CidadeUpdateInput): Promise<DbOperationResult<Cidade>> {
        try {
            const cidade = await this.prisma.cidade.update({
                where: {id},
                data: value
            })
            return {kind: "ok", value: cidade}
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return {kind: "not-found"};
                }
            }
            throw error;
        }
    }

    async delete(id: number): Promise<DbOperationResult<void>> {
        try {
            await this.prisma.cidade.delete({where: {id}})
            return {kind: "ok", value: undefined}
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return {kind: "not-found"};
                }
            }
            throw error;
        }
    }
}