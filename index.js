#!/usr/bin/node

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer((req, res) => {
   const fileName = req.url === '/' ? '/index.html' : req.url;
   const filePath = path.join(__dirname, fileName);

   fs.readFile(filePath, (err, data) => {
      if (err) {
         const pathNotFound = path.join(__dirname, '404.html');
         fs.readFile(pathNotFound, (err2, data) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
         });
         return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
   });
});


server.listen(3000, () => {
   console.log('Server started on http://localhost:3000');
});
