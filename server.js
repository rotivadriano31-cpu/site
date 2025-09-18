const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>PUC Minas - Simulação</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <header>
    <h1>PUC Minas</h1>
    <nav>
      <ul>
        <li><a href="#">Graduação</a></li>
        <li><a href="#">Pós-graduação</a></li>
        <li><a href="#">Institucional</a></li>
        <li><a href="#">Serviços</a></li>
        <li><a href="#">Campi</a></li>
      </ul>
    </nav>
  </header>

  <section class="banner">
    BEM-VINDO À PUC MINAS
  </section>

  <section class="content">
    <h2>Destaques</h2>
    <p>Este é um exemplo simulado com base no site oficial da PUC Minas.</p>
  </section>

  <footer class="footer">
    &copy; 2025 PUC Minas - Todos os direitos reservados
  </footer>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Página principal
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);

  } else if (req.method === 'GET' && req.url === '/style.css') {
    // Servir CSS
    const cssPath = path.join(__dirname, 'style.css');
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Erro ao carregar CSS');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });

  } else {
    // 404 para outros caminhos
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
