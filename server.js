const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Formulário - PUC Style</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="form-container">
          <h1>Contato</h1>
          <p class="subtitle">Preencha os dados abaixo</p>
          <form action="/enviar" method="post">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone">

            <button type="submit">Enviar</button>
          </form>
        </div>
      </body>
      </html>
    `);
  } else if (req.method === 'GET' && req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Erro ao carregar o CSS');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/enviar') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const params = new URLSearchParams(body);
      const nome = params.get('nome');
      const email = params.get('email');
      const telefone = params.get('telefone');

      console.log('Dados recebidos:');
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Telefone:', telefone);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h2>Dados recebidos com sucesso!</h2><a href="/">Voltar</a>`);
    });
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
