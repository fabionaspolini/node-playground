import type {FastifyInstance} from "fastify";
import type {Cidade} from "../models/cidade.js";
import {diContainer} from "@fastify/awilix";

export default async function cidadeRouter(fastify: FastifyInstance) {
    // Resolve as dependências do container necessárias para as rotas (ou usar request.diContainer para obter scoped instances nas requests)
    const cidadeRepository = diContainer.resolve("cidadeRepository");
    
    // 1. READ ALL (Listar todas as cidades)
    fastify.get('/', (request, reply) => {
        return cidadeRepository.list()
    });

    // 2. READ BY ID (Buscar uma cidade específica)
    fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const id = parseInt(request.params.id);
        const cidade = await cidadeRepository.get(id);
        
        if (!cidade) {
            return reply.status(404).send({erro: "Cidade não encontrada"});
        }

        return cidade;
    });

    // 3. CREATE (Cadastrar uma nova cidade)
    fastify.post<{ Body: Omit<Cidade, 'id'> }>('/', async (request, reply) => {
        const {nome, estado} = request.body;

        if (!nome || !estado) {
            return reply.status(400).send({erro: "Nome e estado são obrigatórios"});
        }
        
        const cidade = await cidadeRepository.create({nome, estado});
        return reply.status(201).send(cidade);
    });

    // 4. UPDATE (Atualizar os dados de uma cidade)
    fastify.put<{ Params: { id: string }; Body: Partial<Omit<Cidade, 'id'>> }>('/:id', async (request, reply) => {
        const id = parseInt(request.params.id);
        const result = await cidadeRepository.update(id, {...request.body});
        switch (result.kind) {
            case "ok": return result.value;
            case "not-found": return reply.status(404).send({erro: "Cidade não encontrada."});
        }
    });

    // 5. DELETE (Remover uma cidade)
    fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const id = parseInt(request.params.id);
        const result = await cidadeRepository.delete(id);
        switch (result.kind) {
            case "ok": return {code: "ok"};
            case "not-found": return {code: "not-found"};
        }
    });
}