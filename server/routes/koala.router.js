const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION (Johnny/Reese, Johnny setting up DB)


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


// PUT


// DELETE

module.exports = koalaRouter;