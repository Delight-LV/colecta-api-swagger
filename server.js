import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files
app.use(express.static(join(__dirname, 'docs')));

// Serve the swagger.yaml file
app.get('/swagger.yaml', (req, res) => {
    const yamlContent = fs.readFileSync(join(__dirname, 'docs', 'swagger.yaml'), 'utf8');
    res.setHeader('Content-Type', 'text/yaml');
    res.send(yamlContent);
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'docs', 'index.html'));
});

app.listen(port, () => {
    console.log(`Swagger UI is available at http://localhost:${port}`);
}); 