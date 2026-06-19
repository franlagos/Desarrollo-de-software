import express from 'express';
import {Character} from './character.js';

const app = express();

const characters = [
  new Character(
    'Darth Vader',
    'Sith',
    10,
    100,
    20,
    10,
    ['Lightsaber', 'Death Star'],
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
]

app.get('/api/characters/', (req, res) => {
    res.json(characters);
})


app.get('/api/characters/:id', (req, res) => {
    const character = characters.find((character) => character.id === req.params.id)
    if (!character) {
        res.status(404).send({ message: 'Character not found' });
    }
    res.json(character);
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
