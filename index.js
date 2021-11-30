const express = require('express');
const pokeJson = require('./pokemons.json');
const pokemons = pokeJson.pokemons;
const app = express();
const router = express.Router();
app.use(express.json());

const port = process.env.PORT || 8080;
console.clear();

function logger(req, res, next) {
    console.log('URL:', req.url);
    next();
}

function notFound(req, res) {
    res.status(404).send('Not Found Api!');
}

router.get('/pokedex', (req, res) => {
    res.json(pokemons);
});

router.get('/pokemon/:id', (req, res) => {
    const id = req.params?.id;
    let pokemon = 'Not Found!';
    const pokemonList = pokemons.filter(e => e.id == id);

    if (pokemonList.length > 0) {
        pokemon = pokemonList[0];
    }

    res.json(pokemon);
});

app.use(logger);
app.use('/api/', router);
app.use(notFound);


app.listen(port);
console.log('Server started at http://localhost:' + port);