const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Página inicial com apenas um botão
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
            <p class="frase-logo">Clique no botão abaixo para preencher seu endereço</p>
          </div>

          <button 
            type="button" 
            onclick="window.location.href='/endereco'" 
            style="
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
            "
          >
            Preencher Endereço
          </button>
        </div>
      </body>
      </html>
    `);

  // Página de endereço
  } else if (req.method === 'GET' && req.url === '/endereco') {
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

  // Processamento do formulário de endereço
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

  // Servir o arquivo CSS
  } else if (req.method === 'GET' && req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Erro ao carregar o CSS');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });

  // Servir o logo
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


