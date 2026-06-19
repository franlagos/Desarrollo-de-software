import express from 'express';
import {Character} from './character.js';

const app = express();
app.use(express.json());

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
    res.json({data:characters});
})


app.get('/api/characters/:id', (req, res) => {
    const character = characters.find((character) => character.id === req.params.id)
    if (!character) {
        res.status(404).send({ message: 'Character not found' });
    }
    res.json({data:characters});
})


app.post('/api/characters/', (req, res) => {
    const { name, characterClass, items, attack, mana, hp, level } = req.body;
   
    const character = new Character(name, characterClass, level, hp, attack, mana, items);
    
    characters.push(character);
    res.status(201).send({ message: 'Character created', data: character });
})


app.put('/api/characters/:id', (req, res) => {
    const characterIdx = characters.findIndex((character) => character.id === req.params.id);
    if (characterIdx === -1) {
        res.status(404).send({ message: 'Character not found' });
    }
    const input = {
        name: req.body.name,
        characterClass: req.body.characterClass,
        items: req.body.items,
        attack: req.body.attack,
        mana: req.body.mana,
        hp: req.body.hp,
        level: req.body.level
    }
    characters[characterIdx]={...characters[characterIdx], ...input};
    res.status(200).send({ message: 'Character updated', data: characters[characterIdx] });
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
