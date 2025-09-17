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
        <meta charset="UTF-8" />
        <title>Formulário - PUC Style</title>
        <link rel="stylesheet" href="/style.css" />
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

          <button type="button" onclick="window.location.href='/endereco'" style="background-color: #f7b500; color: #002f6c; border: none; padding: 12px; width: 100%; font-size: 16px; font-weight: bold; border-radius: 5px; cursor: pointer; margin-top: 10px;">
            Preencher Endereço
          </button>
        </div>
      </body>
      </html>
    `);
  } else if (req.method === 'GET' && req.url === '/endereco') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Endereço - PUC Style</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="form-container">
          <h1>Endereço</h1>
          <form action="/salvar-endereco" method="post">
            <label for="rua">Rua:</label>
            <input type="text" id="rua" name="rua" required>

            <label for="numero">Número:</label>
            <input type="text" id="numero" name="numero" required>

            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" required>

            <button type="submit">Enviar</button>
          </form>
          <br />
          <a href="/">Voltar</a>
        </div>
      </body>
      </html>
    `);
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
  } else if (req.method === 'POST' && req.url === '/salvar-endereco') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const rua = params.get('rua');
      const numero = params.get('numero');
      const cep = params.get('cep');

      console.log('Endereço recebido:');
      console.log('Rua:', rua);
      console.log('Número:', numero);
      console.log('CEP:', cep);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h2>Endereço recebido com sucesso!</h2>
        <p>Rua: ${rua}</p>
        <p>Número: ${numero}</p>
        <p>CEP: ${cep}</p>
        <a href="/">Voltar para a página inicial</a>
      `);
    });
  } else if (req.method === 'GET' && req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Erro ao carregar o CSS');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
