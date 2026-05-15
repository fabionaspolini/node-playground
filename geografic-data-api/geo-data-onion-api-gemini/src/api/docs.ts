export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Geographic Data API",
    version: "1.0.0",
    description: "API para gerenciamento de dados geográficos (Países, Estados, Cidades).",
  },
  paths: {
    "/paises/post": {
      post: {
        tags: ["Países"],
        summary: "Cria um novo país",
        responses: { 201: { description: "Criado" } },
      },
    },
    "/paises/get": {
      get: {
        tags: ["Países"],
        summary: "Lista países",
        responses: { 200: { description: "Sucesso" } },
      },
    },
    "/paises/get/{id}": {
      get: {
        tags: ["Países"],
        summary: "Busca país por ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Sucesso" } },
      },
    },
    "/estados/post": {
      post: {
        tags: ["Estados"],
        summary: "Cria um novo estado",
        responses: { 201: { description: "Criado" } },
      },
    },
    "/cidades/post": {
      post: {
        tags: ["Cidades"],
        summary: "Cria uma nova cidade",
        responses: { 201: { description: "Criado" } },
      },
    },
  },
};
