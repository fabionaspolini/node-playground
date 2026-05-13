// server.js
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import { randomUUID } from 'node:crypto';

const app = express();
app.use(express.json()); // Middleware para parsear JSON (como o AddControllers no .NET)

// Configuração da conexão (Equivalente ao ConnectionString do appsettings.json)
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node-simple-app',
    password: '123456',
    port: 5432,
});

// --- ROTAS DO CRUD ---

// CREATE
app.post('/cidades', async (req, res) => {
    const { nome, uf } = req.body;
    const id = randomUUID();

    try {
        await pool.query(
            'INSERT INTO cidades (id, nome, uf) VALUES ($1, $2, $3)',
            [id, nome, uf]
        );
        res.status(201).json({ id, nome, uf });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ (List)
app.get('/cidades', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cidades');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET
app.get('/cidades/:id', async (req, res) => {
   const { id } = req.params;
   try {
       const result = await pool.query('select * from cidades where id = $1', [id]);
       if (result.rows.length > 0) {
           res.json(result.rows[0]);
       } else {
           res.status(404).send()
       }
   } catch (err) {
       res.status(500).json({ error: err.message });
   }
});

// UPDATE
app.put('/cidades/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, uf } = req.body;

    try {
        await pool.query(
            'UPDATE cidades SET nome = $1, uf = $2 WHERE id = $3',
            [nome, uf, id]
        );
        res.send('Cidade atualizada com sucesso');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE
app.delete('/cidades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM cidades WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('🚀 API rodando em http://localhost:3000'));