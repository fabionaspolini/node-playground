require('dotenv').config();
const express = require('express');
const cityRoutes = require('./routes/cityRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/cities', cityRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Visite http://localhost:${PORT}/health para verificar o status`);
});

