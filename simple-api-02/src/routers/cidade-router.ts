import type {FastifyInstance} from "fastify";
import type {Cidade} from "../models/cidade.js";

// Banco de dados temporário na memória
let cidades: Cidade[] = [
    { id: 1, nome: "Criciúma", estado: "SC" },
    { id: 2, nome: "São Paulo", estado: "SP" }
];
let proximoId = 3;

export default async function cidadeRouter(fastify: FastifyInstance) {
    // 1. READ ALL (Listar todas as cidades)
    fastify.get('/', async (request, reply) => {
        return cidades;
    });

    // 2. READ BY ID (Buscar uma cidade específica)
    fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const id = parseInt(request.params.id);
        const cidade = cidades.find(c => c.id === id);

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

        const novaCidade: Cidade = {
            id: proximoId++,
            nome,
            estado
        };

        cidades.push(novaCidade);
        return reply.status(201).send(novaCidade);
    });

    // 4. UPDATE (Atualizar os dados de uma cidade)
    fastify.put<{ Params: { id: string }; Body: Partial<Omit<Cidade, 'id'>> }>('/:id', async (request, reply) => {
        const id = parseInt(request.params.id);
        const {nome, estado} = request.body;

        const cidadeIndex = cidades.findIndex(c => c.id === id);

        if (cidadeIndex === -1) {
            return reply.status(404).send({erro: "Cidade não encontrada"});
        }

        // Atualiza apenas os campos enviados no body
        const cidade = cidades[cidadeIndex]!;
        if (nome) cidade.nome = nome;
        if (estado) cidade.estado = estado;

        return cidade;
    });

    // 5. DELETE (Remover uma cidade)
    fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
        const id = parseInt(request.params.id);
        const cidadeIndex = cidades.findIndex(c => c.id === id);

        if (cidadeIndex === -1) {
            return reply.status(404).send({erro: "Cidade não encontrada"});
        }

        cidades.splice(cidadeIndex, 1);
        return reply.status(204).send(); // Status 204 significa sucesso sem conteúdo de resposta
    });
}