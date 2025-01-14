const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log('running...');
});

let db = [
    {
        id: 1,
        titulo: "O Conde de Monte Cristo",
        autor: "Alexandre Dumas",
        editora: "Classicos Zahar",
        ano: 1846,
        quant: 17,
        preco: 176.99
    },
    {
        id: 2,
        titulo: "Os três Mosqueteiros",
        autor: "Alexandre Dumas",
        editora: "Classicos Zahar",
        ano: 1844,
        quant: 16,
        preco: 113.73
    },
    {
        id: 3,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        editora: "Agir",
        ano: 1943,
        quant: 15,
        preco: 25.0
    },
    {
        id: 4,
        titulo: "Dom Quixote",
        autor: "Miguel de Cervantes",
        editora: "Saraiva",
        ano: 1605,
        quant: 5,
        preco: 60.0
    },
    {
        id: 5,
        titulo: "Os Miseráveis",
        autor: "Victor Hugo",
        editora: "Martin Claret",
        ano: 1862,
        quant: 22,
        preco: 122.86
    },
    {
        id: 6,
        titulo: "O Corcunda de Notre Dame",
        autor: "Victor Hugo",
        editora: "Classicos Zahar",
        ano: 1831,
        quant: 11,
        preco: 63.56
    },
    {
        id: 7,
        titulo: "O Homen que Ri",
        autor: "Victor Hugo",
        editora: "Martin Claret",
        ano: 1869,
        quant: 18,
        preco: 45.0
    },
    {
        id: 8,
        titulo: "O Últimos Dia de Um condedano",
        autor: "Victo Hugo",
        editora: "L&PM",
        ano: 1829,
        quant: 2,
        preco: 15.66
    },
    {
        id: 9,
        titulo: "Os Trabalhadores do Mar",
        autor: "Victor Hugo",
        editora: "Princips",
        ano: 1866,
        quant: 1,
        preco: 17.99
    },
    {
        id: 10,
        titulo: "Os Bruzundangas",
        autor: "Lima Barreto",
        editora: "Principis",
        ano: 1923,
        quant: 13,
        preco: 14.20
    }
];

// Operações CRUD
app.get('/livros', (req, res) => {
    res.json(db);
});

app.post('/livros', (req, res) => {
    let lastId = Math.max(...db.map(l => l.id));
    const livro = {
        id: ++lastId,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editora: req.body.editora,
        ano: req.body.ano,
        quant: req.body.quant,
        preco: req.body.preco
    };
    db.push(livro);
    res.json(db);
});

app.get('/livros/:id', (req, res) => {
    let livro = db.find(l => l.id === parseInt(req.params.id));
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.put('/livros/:id', (req, res) => {
    let livro = db.find(l => l.id === parseInt(req.params.id));
    if (livro) {
        livro.titulo = req.body.titulo || livro.titulo;
        livro.autor = req.body.autor || livro.autor;
        livro.editora = req.body.editora || livro.editora;
        livro.ano = req.body.ano || livro.ano;
        livro.quant = req.body.quant || livro.quant;
        livro.preco = req.body.preco || livro.preco;
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.delete('/livros/:id', (req, res) => {
    db = db.filter(l => l.id !== parseInt(req.params.id));
    res.json(db);
});

// Operações adicionais
app.get('/livros/editora/:editora', (req, res) => {
    let livros = db.filter(l => l.editora.toLowerCase() === req.params.editora.toLowerCase());
    res.json(livros);
});

app.get('/livros/titulo/:keyword', (req, res) => {
    let livros = db.filter(l => l.titulo.toLowerCase().includes(req.params.keyword.toLowerCase()));
    res.json(livros);
});

app.get('/livros/acima-preco/:preco', (req, res) => {
    let livros = db.filter(l => l.preco > parseFloat(req.params.preco));
    res.json(livros);
});

app.get('/livros/abaixo-preco/:preco', (req, res) => {
    let livros = db.filter(l => l.preco < parseFloat(req.params.preco));
    res.json(livros);
});

app.get('/livros/mais-recentes', (req, res) => {
    let livros = [...db].sort((a, b) => b.ano - a.ano);
    res.json(livros);
});

app.get('/livros/mais-antigos', (req, res) => {
    let livros = [...db].sort((a, b) => a.ano - b.ano);
    res.json(livros);
});

app.get('/livros/sem-estoque', (req, res) => {
    let livros = db.filter(l => l.quant === 0);
    res.json(livros);
});

// Endpoint inexistente
app.use((req, res) => {
    res.status(404).send('Endpoint não encontrado');
});