const express = require('express');
const connectDB = require('./config/database');
const app = express();
const fs = require('fs');
const path = require('path');

// Conectar ao banco de dados
connectDB();

// Middleware para parsing de JSON
app.use(express.json());

// Crie a pasta para relatórios, se não existir
if (!fs.existsSync('./reports')) {
  fs.mkdirSync('./reports');
}

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/reports', require('./routes/report'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
