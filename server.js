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
      <bo
