const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION (Johnny, also setting up DB)
const pool = require('../modules/pool');

// GET (Shyla)
koalaRouter.get('/', (req, res) => {
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

  let queryText = `INSERT INTO "koala" ("name", "age", "gender", "ready_to_transer", "notes")
                  VALUES ($1, $2, $3, $4, $5);`;


  pool.query(queryText, [newKoala.name, newKoala.age, newKoala.gender, newKoala.ready_to_transer, newKoala.notes]) 
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
koalaRouter.delete('/:id', (req, res) => {
  let reqID = req.params.id;
  console.log('Delete request id', reqID);
  
  let sqlText = 'DELETE FROM "koala" WHERE "id"=$1;';
  pool.query(sqlText, [reqID])
    .then((result) => {
      console.log('Koala Deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making database query ${sqlText}`, error);
      res.sendStatus(500);
    })
})

module.exports = koalaRouter;
