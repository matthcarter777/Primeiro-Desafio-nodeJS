const express = require('express'); //importando o express
const cors = require('cors');

const { uuid } = require('uuidv4')
const { response } = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const carros = [];

app.get('/carros', ( request, response) => {
    const { marca } = request.query;

    const results = marca
        ?  carros.filter( carro => carro.marca.includes(marca))
        : carros;
    
    return response.json(results);
});

app.post('/carros', ( request, response) => {
    const { modelo, marca, ano } = request.body;

    const carro = { id: uuid(), marca, modelo, ano};

    carros.push(carro);

    return response.json(carro);
});

app.put('/carros/:id', ( request, response) => {
    const { id} = request.params;
    const { marca, modelo, ano} = request.body;

    const carroIndex = carros.findIndex( carro => carro.id === id);

    if ( carroIndex < 0){
        return response.status(400).json({ error: "Carro not found."})
    }

    const carro = {
        id,
        marca,
        modelo,
        ano
    }

    carros[carroIndex] = carro;

    return response.json(carro);
});

app.delete('/carros/:id', (request, response) => {
    const { id } = request.params;

    const carroIndex = carros.findIndex( carro => carro.id === id);

    if ( carroIndex < 0){
        return response.status(400).json({ error: "Carro not found."})
    }

    carros.splice(carroIndex, 1);

    return response.status(204).send();
})


app.listen(3334, () => {
    console.log('Back-end started!');
});
