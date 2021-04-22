const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION (Johnny, also setting up DB)
const pool = require('../modules/pool');

// GET (Shyla)
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koala";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting koalas', error);
      res.sendStatus(500);
    });
  });


// POST (Reese)
koalaRouter.post('/', (req,res) => {
  let newKoala = req.body;
  console.log('Adding new Koala...', newKoala);

  let queryText = `INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes")
                  VALUES ($1, $2, $3, $4, $5);`;

  pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes]) 
  .then(result => {
      res.sendStatus(201);
  })  
  .catch(error => {
      console.log(`Error adding Koala to server:`, error);
      res.sendStatus(500);    
  });
})

// PUT


// DELETE

module.exports = koalaRouter;
