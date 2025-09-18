const http = require('http');
const fs = require('fs');
const path = require('path');
 
const PORT = 3000;
 
let dadosUsuario = {}; // Temporário (em memória)
 
const server = http.createServer((req, res) => {
  // Página inicial com formulário (nome, email, telefone)
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Formulário - PUC</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="form-container">
          <div class="logo-container">
            <img src="/logo.png" alt="Logo PUC" style="max-width: 150px; margin-bottom: 10px;" />
            <p class="frase-logo">Preencha os dados abaixo!</p>
          </div>
 
          <form action="/endereco" method="post">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required>
 
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
 
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone">
 
            <button type="submit" style="
              background-color: #f7b500; 
              color: #002f6c; 
              border: none; 
              padding: 15px; 
              width: 100%; 
              font-size: 18px; 
              font-weight: bold; 
              border-radius: 5px; 
              cursor: pointer; 
              margin-top: 20px;
            ">
              Próxima Página
            </button>
          </form>
        </div>
      </body>
      </html>
    `);
 
  // Receber dados do primeiro formulário e mostrar página de endereço
  } else if (req.method === 'POST' && req.url === '/endereco') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      dadosUsuario.nome = params.get('nome');
      dadosUsuario.email = params.get('email');
      dadosUsuario.telefone = params.get('telefone');
 
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Endereço - PUC</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div class="form-container">
            <h1>Endereço</h1>
            <form action="/salvar-dados" method="post">
              <label for="rua">Rua:</label>
              <input type="text" id="rua" name="rua" required>
 
              <label for="numero">Número:</label>
              <input type="text" id="numero" name="numero" required>
 
              <label for="cep">CEP:</label>
              <input type="text" id="cep" name="cep" required>
 
              <button type="submit">Enviar Dados</button>
            </form>
            <br />
            <a href="/">Voltar</a>
          </div>
        </body>
        </html>
      `);
    });
 
  // Receber dados finais e mostrar todos os dados preenchidos
  } else if (req.method === 'POST' && req.url === '/salvar-dados') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      dadosUsuario.rua = params.get('rua');
      dadosUsuario.numero = params.get('numero');
      dadosUsuario.cep = params.get('cep');
 
      console.log('Dados completos recebidos:');
      console.log(dadosUsuario);
 
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h2>Todos os dados foram recebidos com sucesso!</h2>
        <p><strong>Nome:</strong> ${dadosUsuario.nome}</p>
        <p><strong>Email:</strong> ${dadosUsuario.email}</p>
        <p><strong>Telefone:</strong> ${dadosUsuario.telefone}</p>
        <p><strong>Rua:</strong> ${dadosUsuario.rua}</p>
        <p><strong>Número:</strong> ${dadosUsuario.numero}</p>
        <p><strong>CEP:</strong> ${dadosUsuario.cep}</p>
        <a href="/">Voltar ao início</a>
      `);
 
      // Resetar o objeto após salvar (opcional)
      dadosUsuario = {};
    });
 
  // Servir CSS
  } else if (req.method === 'GET' && req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Erro ao carregar o CSS');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
 
  // Servir logo
  } else if (req.method === 'GET' && req.url === '/logo.png') {
    fs.readFile(path.join(__dirname, 'logo.png'), (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Logo não encontrada');
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    });
 
  // Rota não encontrada
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});
 
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
