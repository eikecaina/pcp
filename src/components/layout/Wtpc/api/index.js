const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get('/', (req, res) => {

    const jsonFilePath = path.join(__dirname, 'dataBase.json')
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Erro ao ler arquivo');
            return res.status(500).send('Erro interno no servidor');
        }
        const jsonData = JSON.parse(data);

        res.json(jsonData);
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});