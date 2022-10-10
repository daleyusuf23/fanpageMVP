const express = require('express');
const {restart} = require('nodemon');
const {Client} = require('pg');
const app = express();
const PORT = process.env.PORT || 3005

app.use(express.json());

const client = new Client({
    connectionString:"postgresql://postgres:docker@localhost:5432/fanbase"
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'docker',
//     database: 'fanbase'
});


client.connect();


app.get('/', (req,res) => {
    res.status(200).send('Hello world!');
});


app.get('/api/fan', (req,res) => {
    // res.status(200).send('Hello world!');
    client.query('SELECT * FROM fan', (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.send(result.rows);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
   });