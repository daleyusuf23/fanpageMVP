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

//TEST
app.get('/', (req,res) => {
    res.status(200).send('Hello world!');
});

//GET ROUTE
app.get('/api/fan', (req,res) => {
    client.query('SELECT * FROM fan', (err, result) => {
        if (err) {
            console.error(err)
        } else {
            res.send(result.rows);
        }
    })
});

//POST ROUTE
app.post('/api/fan', (req,res) => {
    let {name, phone, tier} = req.body;
    client.query ('INSERT INTO fan (name, phone, tier) VALUES ($1, $2, $3);', [name, phone, tier], (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send(results.rows);
        }
     })
     console.log(name, phone, tier);
     res.status(200);
});

//PATCH ROUTE
app.patch('/api/fan/:id', (req,res) => {
    client.query('UPDATE fan SET name = $1 WHERE fan_id = $2', [req.body.name, req.params.id], (error, results) => {
        if(error) {
            console.error(error)
        } else {
             res.send(results.rows);
        }
    })
});

//DELETE ROUTE
app.delete('/api/fan/:id', (req,res) => {
    client.query('DELETE FROM fan WHERE fan_id = $1', [req.params.id], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.send (results.rows);
        }
    })
});


//PORT
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
   });