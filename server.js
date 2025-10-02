const http = require('http');
const fs = require('fs');
const path = require('path');
 
const PORT = 3000;
let dadosUsuario = {}; // Temporário (em memória)
 
const server = http.createServer((req, res) => {
  // Página inicial com formulário (nome, email, telefone)
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Formulário - PUC</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body style="background-image: url('/fundo.png'); background-size: cover; background-position: center; background-attachment: fixed; margin: 0; font-family: Arial, sans-serif;">
        <div class="form-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
          <div class="logo-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 20px;">
            <img src="/logo.png" alt="Logo PUC" style="max-width: 150px; margin-bottom: 10px;" />
            <p class="frase-logo" style="font-size: 18px; color: white;">Preencha os dados abaixo!</p>
          </div>
 
          <form action="/endereco" method="post" style="width: 100%; max-width: 400px; padding: 20px; background-color: rgba(255, 255, 255, 0.7); border-radius: 10px;">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" required style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            
            <button type="submit" style="background-color: #f7b500; color: #002f6c; border: none; padding: 15px; width: 100%; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; margin-top: 20px;">
              Próxima Página
            </button>
          </form>
        </div>
      </body>
      </html>
    `);
  }
 
  // Página para inserir endereço
  else if (req.method === 'POST' && req.url === '/endereco') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      dadosUsuario.nome = params.get('nome');
      dadosUsuario.email = params.get('email');
      dadosUsuario.telefone = params.get('telefone');
 
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Endereço - PUC</title>
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
            <a href="/">Voltar ao início</a>
          </div>
        </body>
        </html>
      `);
    });
  }
 
  // Página final com todos os dados
  else if (req.method === 'POST' && req.url === '/salvar-dados') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      dadosUsuario.rua = params.get('rua');
      dadosUsuario.numero = params.get('numero');
      dadosUsuario.cep = params.get('cep');
 
      console.log('Dados completos recebidos:');
      console.log(dadosUsuario);
 
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Confirmação de Dados</title>
        </head>
        <body>
          <h2>Todos os dados foram recebidos com sucesso!</h2>
          <p><strong>Nome:</strong> ${dadosUsuario.nome}</p>
          <p><strong>Email:</strong> ${dadosUsuario.email}</p>
          <p><strong>Telefone:</strong> ${dadosUsuario.telefone}</p>
          <p><strong>Rua:</strong> ${dadosUsuario.rua}</p>
          <p><strong>Número:</strong> ${dadosUsuario.numero}</p>
          <p><strong>CEP:</strong> ${dadosUsuario.cep}</p>
          <a href="/">Voltar ao início</a>
        </body>
        </html>
      `);
 
      // Resetar dados após envio (opcional)
      dadosUsuario = {};
    });
  }
 
  // Servir arquivos estáticos (CSS e imagens)
  else if (req.method === 'GET' && req.url === '/style.css') {
    fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Erro ao carregar o CSS');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/logo.png') {
    fs.readFile(path.join(__dirname, 'logo.png'), (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Logo não encontrada');
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    });
  } else if (req.method === 'GET' && req.url === '/fundo.png') {
    fs.readFile(path.join(__dirname, 'fundo.png'), (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Imagem de fundo não encontrada');
      }
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    });
  }
 
  // Rota padrão: 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  }
});
 
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
