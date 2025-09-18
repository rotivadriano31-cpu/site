const http = require('http');

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>PUC Minas - Simulação</title>
  <style>
    body {
      margin: 0;
      font-family: "Segoe UI", Arial, sans-serif;
      background-color: #f2f2f2;
    }
    header {
      background-color: #002f6c;
      color: white;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header h1 {
      margin: 0;
      font-size: 24px;
    }
    nav ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
    }
    nav li {
      margin-left: 20px;
    }
    nav a {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
    nav a:hover {
      text-decoration: underline;
    }
    .banner {
      background: linear-gradient(to right, #004080, #002f6c);
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 30px;
      font-weight: bold;
    }
    .content {
      padding: 40px;
      background-color: white;
    }
    .footer {
      background-color: #002f6c;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 40px;
    }
  </style>
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
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
