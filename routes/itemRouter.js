const express = require('express');
const bodyParser = require('body-parser');
var db  = require('../db_connection');


const itemRouter = express.Router();

//allows parsing of response body in JSON format
itemRouter.use(bodyParser.json());



//for /items
itemRouter.route('/')
.get((req,res,next) => {
    //querying DB for all items

    var sql = "SELECT * FROM item";
    
        db.query(sql, function (err, result, fields) {
          if (err) throw err;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        });
      

});



module.exports = itemRouter;