const express = require('express');
const pokeJson = require('./pokemons.json');
const cors = require('cors');
const pokemons = pokeJson.pokemons;
const app = express();
app.use(cors({ credentials: true, origin: true }));
const router = express.Router();
app.use(express.json());

const port = process.env.PORT || 8080;
console.clear();
const alternativeIcon = "https://www.clipartmax.com/png/middle/22-227332_pokemon-icon-png.png"


function logger(req, res, next) {
    console.log('URL:', req.url);
    next();
}

function notFound(req, res) {
    res.status(404).send('Not Found Api!');
}

router.get('/pokedex', (req, res) => {
    const returnlist = pokemons.map(e => {
        e.url_icon_2 = alternativeIcon;
        return e;
    })
    res.json(returnlist);
});

router.get('/pokemon/:id', (req, res) => {
    const id = req.params?.id;
    let pokemon = 'Not Found!';
    const pokemonList = pokemons.filter(e => e.id == id);

    if (pokemonList.length > 0) {
        pokemon = pokemonList[0];
        pokemon.atk = Math.floor(Math.random() * (1 - 100 + 1) + 1) * -1;
        pokemon.def = Math.floor(Math.random() * (1 - 100 + 1) + 1) * -1;
        pokemon.atks = Math.floor(Math.random() * (1 - 100 + 1) + 1) * -1;
        pokemon.defs = Math.floor(Math.random() * (1 - 100 + 1) + 1) * -1;
        pokemon.url_icon_2 = alternativeIcon;
    }

    res.json(pokemon);
});

app.use(logger);
app.use('/api/', router);
app.use(notFound);


app.listen(port);
console.log('Server started at http://localhost:' + port);