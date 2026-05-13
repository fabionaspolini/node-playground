const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// "Banco de dados" temporário
let pessoas = [
    { id: 1, nome: "Dev C#", endereco: "Rua do .NET, 100", salario: 5000 }
];

// --- ROTAS DO CRUD ---

// 1. READ (Listar todos) - Equivalente ao GET do Controller
app.get('/pessoas', (req, res) => {
    res.status(200).json(pessoas);
});

// 2. READ (Buscar por ID) - Uso de Route Params
app.get('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const pessoa = pessoas.find(p => p.id === parseInt(id));

    if (!pessoa) {
        return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    res.json(pessoa);
});

// 3. CREATE - Equivalente ao [FromBody] do C#
app.post('/pessoas', (req, res) => {
    const { nome, endereco, salario } = req.body;

    const novaPessoa = {
        id: pessoas.length + 1,
        nome,
        endereco,
        salario
    };

    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

// 4. UPDATE - Atualização total ou parcial
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, endereco, salario } = req.body;

    const index = pessoas.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: "Usuário não existe" });
    }

    pessoas[index] = { ...pessoas[index], nome, endereco, salario };
    res.json(pessoas[index]);
});

// 5. DELETE
app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const index = pessoas.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: "Pessoa não encontrada" });
    }

    pessoas.splice(index, 1);
    res.status(204).send(); // No Content
});

app.listen(port, () => {
    console.log(`🚀 API rodando em http://localhost:${port}`);
});